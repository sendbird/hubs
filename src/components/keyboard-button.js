import sendbird from '../utils/sendbird';

AFRAME.registerComponent("keyboard-button", {
    init() {
      this.keyboardButton = this.el.querySelector('.keyboard-button');
      this.keyCode = this.keyboardButton.getAttribute('key-code');
      this.keyValue = this.keyboardButton.getAttribute('key-value');
      this.characterController = this.el.sceneEl.systems["hubs-systems"].characterController;

      this.keyboardButtonText = this.keyboardButton.getAttribute('text');

      this.onClick = async () => {
        console.log("keyboard clicked", this.keyCode)
        // switch on keys
        switch(this.keyCode) {
          case "13":
          case "06":

            if(!sendbird.currentChannel){
              return
            }
            const worldPos = new THREE.Vector3();
            worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);

            if(sendbird.currentMessage.includes('teleport')){
              const targetUser = sendbird.currentMessage.split(" ")[1];
              const targetUserLatestMessage = sendbird.messages.reverse().find((message)=>message.nickname === targetUser.nickname);

              this.characterController.teleportTo(JSON.parse(targetUserLatestMessage.data));
              sendbird.currentMessage += " "
              this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });
              break;
            }

            const userMessageParams = {};
            userMessageParams.message = sendbird.currentMessage;
            userMessageParams.data = JSON.stringify(worldPos);

            sendbird.currentChannel.sendUserMessage(userMessageParams)
            .onSucceeded((message) => {
              sendbird.currentMessage = "";
              sendbird.messages.push(message);
              this.el.sceneEl.emit("message-sent");
  
            })
            .onFailed((error) => {
                console.log(error)
                console.log("failed")
            });
   
            this.el.sceneEl.emit("key-submit");
            break;
          case "8":
            sendbird.currentMessage = "";
            console.log('sendbird.currentMessage', sendbird.currentMessage);
            this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });   
          case "32":
            if(sendbird.currentMessage.length < 20){
              sendbird.currentMessage += " "
              this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });
  
              break;
            }
            break;

          default:
            if(sendbird.currentMessage.length < 20){
              sendbird.currentMessage += this.keyboardButtonText.value;
              this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });
            }
        }

  
      };
      this.onHover = () => {
        console.log("keyboard button hovered")
      };
    },
  
    play() {
      this.el.object3D.addEventListener("interact", this.onClick);
      this.el.object3D.addEventListener("hovered", this.onHover);
      document.addEventListener('keypress', (e)=>{
        if(e.charCode==this.keyCode){
          this.onClick();
        }
      });
    },
  
    pause() {
      this.el.object3D.removeEventListener("interact", this.onClick);
    },
  
  });
  