import {
  GroupChannelHandler,
} from '@sendbird/chat/groupChannel';
import sendbird from '../utils/sendbird';
import moment from 'moment';

const MESSAGE_LIST_WIDTH = 0.86;
const LINE_HEIGHT = 0.06;
const CONTAINER_HEIGHT = LINE_HEIGHT*10;
const HEADER_HEIGHT = 0.02;

AFRAME.registerComponent("message-list", {
  init() {
    // listen for incomin messages
    const keyboard = document.createElement('a-entity');

    keyboard.setAttribute('position', `0 0 -0.01`);
    keyboard.setAttribute('geometry', `primitive: plane; width: 0.8; height: 1`);
    keyboard.setAttribute('material', 'color: #4a4a4a; side: double; opacity: 0.7');
    this.el.appendChild(keyboard);


    const messageListContainer = document.createElement('a-entity');

    messageListContainer.setAttribute('position', '0 0 -0.001');
    messageListContainer.setAttribute('slice9', `opacity: 1; color: #8c6ef7`);
    messageListContainer.setAttribute('scale', `${MESSAGE_LIST_WIDTH} ${CONTAINER_HEIGHT} 0`);

    const header = document.createElement('a-entity');
    header.setAttribute('position', `0 0.34 0.001`);
    header.setAttribute('scale', '0.4 0.4 0');
    this.el.appendChild(header);


    // this.el.appendChild(messageListContainer);

    const appendMessage = (info, index) =>{
      const message = info.message;
      const yPositionOfText = (CONTAINER_HEIGHT/2)-((LINE_HEIGHT/2)*index)-HEADER_HEIGHT;
      const text = document.createElement('a-entity');
      const fullMessage = `${moment(info.time).fromNow()}  ${info.name}: ${message}`;
      const maxMessageLength = 70;


      const leftAlignPosition =  ((MESSAGE_LIST_WIDTH / maxMessageLength) * (maxMessageLength - fullMessage.length) / 2)
      text.setAttribute('text', `value: ${fullMessage};textAlign:center;color:#FFFFFF;alphaTest:0;`);

      text.setAttribute('position', `-${leftAlignPosition-0.1} ${yPositionOfText} 0`);
      text.setAttribute('scale', '0.32 0.32 0');
      text.setAttribute('class', 'message-item');


      this.el.appendChild(text);
    }

    const channelHandler = new GroupChannelHandler();

    this.el.sceneEl.addEventListener("start-chat", async(e) => {
      header.setAttribute('text', `value: ${sendbird.currentChannel.name};`);

      await sendbird.getMessages(sendbird.currentChannel);
      renderMessages(sendbird.messages);
      channelHandler.onMessageReceived = (channel, message) => {
        sendbird.messages.push(message);
        renderMessages(sendbird.messages);

      };

      sendbird.sdk.groupChannel.addGroupChannelHandler("98u089", channelHandler);

      this.el.setAttribute("visible","true");

    });

    const renderMessages = (messages)=>{
      this.el.querySelectorAll('.message-item').forEach(e => e.remove());

      messages.slice(-19).forEach((message, index) => {
        const name = message.messageType === 'admin' ? 'admin' : message.sender.nickname;
        appendMessage({message:message.message, name, time: message.createdAt}, index);

      })

      this.el.sceneEl.addEventListener("message-sent", async(e) => {
        renderMessages(sendbird.messages);
      });
      // loop and append messages
    }

  },

  play() {


  },

  pause() {
  },

});
