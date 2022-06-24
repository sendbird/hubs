import sendbird from '../utils/sendbird';

const MESSAGE_LIST_WIDTH = 0.5;
const LINE_HEIGHT = 0.04;
const CONTAINER_HEIGHT = LINE_HEIGHT*15;
const HEADER_HEIGHT = 0.02;
const messages = [];

AFRAME.registerComponent("message-list", {
  init() {
    // listen for incomin messages
    const messageListContainer = document.createElement('a-entity');

    messageListContainer.setAttribute('position', '0 0 0');
    messageListContainer.setAttribute('slice9', `opacity: 0.8;color: 	#00ff99`);
    messageListContainer.setAttribute('scale', `${MESSAGE_LIST_WIDTH} ${CONTAINER_HEIGHT} 0`);

    const header = document.createElement('a-entity');
    header.setAttribute('text', `value: FRONT END CHAT; textAlign:center; width: 10; height:10; color: black; opacity:1;`);
    header.setAttribute('position', `0 0.34 0.001`);
    header.setAttribute('scale', '0.4 0.4 0');
    this.el.appendChild(header);


    this.el.appendChild(messageListContainer);
    const appendMessage = (e, info) =>{
      const message = e.detail.value;

      const yPositionOfText = (CONTAINER_HEIGHT/2)-((LINE_HEIGHT/2)*messages.length)-HEADER_HEIGHT;

      const text = document.createElement('a-entity');
      messages.push(message);


      console.log('--e', e.detail.value)

      text.setAttribute('text', `value: ${info.time}  ${info.name}: ${message}; textAlign:center; width: 10; height:10; color: black; opacity:1;`);
      text.setAttribute('position', `0 ${yPositionOfText} 0.001`);
      text.setAttribute('scale', '0.3 0.3 0');
      text.setAttribute('class', 'keyboard-button');


      this.el.appendChild(text);
    }
    // this.el.sceneEl.addEventListener("incoming-message", (e)=>{
    //   appendMessage(e, {name: 'James', time: '17:29'})

    // });
    this.el.sceneEl.addEventListener("start-chat", async(e)=>{
      await sendbird.getMessages(sendbird.channels[3]);
      renderMessages(sendbird.messages);
      this.el.setAttribute("visible","true");
      console.log('234234234 init message list');
      console.log(sendbird.currentChannel);

    });

    const renderMessages = (messages)=>{
      console.log('render messages');
      console.log(messages)
    }

  },

  play() {


  },

  pause() {
  },

});
