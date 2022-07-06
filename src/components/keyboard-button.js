import sendbird from '../utils/sendbird';

AFRAME.registerComponent("keyboard-button", {
    init() {
  
      this.onClick = async () => {
        console.log("keyboard clicked")
        const keyboardButton = this.el.querySelector('.keyboard-button');
        const keyboardButtonText = keyboardButton.getAttribute('text');
        const keyCode = keyboardButton.getAttribute('key-code');
        if(keyCode === "06"){
          if(!sendbird.currentChannel){
            return
          }
          const userMessageParams = {};
          userMessageParams.message = sendbird.currentMessage;
          //need to do all that local setup stuff.
          // might need to create a user first
          sendbird.currentChannel.sendUserMessage(userMessageParams)
          .onSucceeded((message) => {
            sendbird.currentMessage = "";
            sendbird.messages.push(message);
            this.el.sceneEl.emit("message-sent");
             console.log("message sent")

          })
          .onFailed((error) => {
              console.log(error)
              console.log("failed")
          });
 
  
          this.el.sceneEl.emit("key-submit");
        }else{
          console.log("clicked")
          let value = keyboardButtonText.value;
          sendbird.currentMessage += keyboardButtonText.value;
          this.el.sceneEl.emit("key-input", { value });
        }
  
  
  
      };
      this.onHover = () => {
        console.log("keyboard button hovered")
      };
    },
  
    play() {
      this.el.object3D.addEventListener("interact", this.onClick);
      this.el.object3D.addEventListener("hovered", this.onHover);
  
    },
  
    pause() {
      this.el.object3D.removeEventListener("interact", this.onClick);
    },
  
  });
  