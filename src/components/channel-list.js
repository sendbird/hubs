import Sendbird, { UserUpdateParams } from '@sendbird/chat';
import sendbird from '../utils/sendbird';

console.log('555', Sendbird);

const CHANNEL_LIST_WIDTH = 0.4;
const CHANNEL_ITEM_HEIGHT = 0.08;
const BORDER_WIDTH = 0.002;

AFRAME.registerComponent("channel-list", {
  init() {
    this.sessionId = null;
    this.el.sceneEl.addEventListener("presence_updated", (info) => {
      const sessionId = info.detail.sessionId;
      if(this.sessionId !== sessionId){
        this.sessionId = sessionId;
        setUpSendBird(sessionId); 
      }
    });
    const setUpSendBird = async (sessionId) => {
      const sendbirdChat = await sendbird.getSdk();
      const response = await sendbird.createUser(sessionId);

      try{
        await sendbirdChat.connect(sessionId, response.access_token);

      }catch(e){
        console.log("sb connection failed", e)
      }

      // await sendbirdChat.setChannelInvitationPreference(true);


      try {
        const channels = await sendbird.getChannels();
        console.log(channels);
        setUpUI(channels);


      } catch (error) {
        console.log('555', error);
          return [null, error];
      }
    }

    const setUpUI = (channels) => {
      const channelNames = channels.map((channel)=>channel.name);
      const CHANNEL_LIST_HEIGHT = CHANNEL_ITEM_HEIGHT * channelNames.length;

      const channelListContainer = document.createElement('a-entity');
      channelListContainer.setAttribute('position', '0 0 0');
      channelListContainer.setAttribute('scale', `${CHANNEL_LIST_WIDTH} ${CHANNEL_LIST_HEIGHT} 0`);
      channelListContainer.setAttribute('slice9', `opacity: 0.8;color: grey;`);
      this.el.appendChild(channelListContainer); 
  
  
      for (let i = 0; i < channelNames.length; i++) {
        const CHANNEL_ITEM_TOP_POSITION = ((CHANNEL_LIST_HEIGHT/2) - (CHANNEL_ITEM_HEIGHT/2)) - (CHANNEL_ITEM_HEIGHT * i);
        const channelListItem = document.createElement('a-entity');
  
        channelListItem.setAttribute('position', `0 ${CHANNEL_ITEM_TOP_POSITION} 0.0005`);
        channelListItem.setAttribute('slice9', `opacity: 0.6;color: white;height:${CHANNEL_ITEM_HEIGHT-BORDER_WIDTH};width:${CHANNEL_LIST_WIDTH}`);
        channelListItem.setAttribute('position', `0 ${CHANNEL_ITEM_TOP_POSITION} 0.0005`);
  
        
        this.el.appendChild(channelListItem);
  
        const button = document.createElement('a-entity');
        button.setAttribute('sprite', '');
        button.setAttribute('is-remote-hover-target', '');
        button.setAttribute('tags', 'singleActionButton:true;');
        button.setAttribute('text-button', 'color', 'white');
        button.setAttribute('text-button', 'backgroundColor', '#343434');
        button.setAttribute('text-button', 'backgroundHoverColor', '#818181');
        button.setAttribute('scale', `${CHANNEL_LIST_WIDTH} ${CHANNEL_ITEM_HEIGHT-BORDER_WIDTH} 0`);
        button.object3D.addEventListener("interact", async ()=>{
          sendbird.currentChannel = channels[i];
          console.log(sendbird.currentChannel);
          this.el.sceneEl.emit("start-chat",{});
          this.el.setAttribute("visible","false")
    
        });
  
        channelListItem.appendChild(button)
  
  
        const text = document.createElement('a-entity');
        text.setAttribute('text', `value: ${channelNames[i]}; textAlign:left; width: 10; height:10; color: black; opacity:1;`);
        text.setAttribute('scale', '0.3 0.3 0.05  ');
        text.setAttribute('position', `0 0 0.0006`);
  
        channelListItem.appendChild(text);
      }
    }


  },

  play() {


  },

  pause() {
  },

});
