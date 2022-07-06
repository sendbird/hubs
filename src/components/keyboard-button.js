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
            console.log(worldPos);
            if(sendbird.currentMessage.includes('teleport')){
              console.log('this.characterController')
              const mockLocation = { x: 0.7907745144970595, y: -0.0007149681729433964, z: 1.0730591885848875 };
              const mockLocation2 = { x: 7.567290102942657, y: 1.1735722732951042, z: -2.799716414112678 };
              console.log(this.characterController);
              this.characterController.teleportTo(mockLocation2);
              sendbird.currentMessage += " "
              this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });
              break;
            }

            const userMessageParams = {};
            userMessageParams.message = sendbird.currentMessage;
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
            sendbird.currentMessage += " "
            this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });

            break;
          default:
            console.log("clicked")
            sendbird.currentMessage += this.keyboardButtonText.value;
            this.el.sceneEl.emit("key-input", { value: sendbird.currentMessage });
            // code block
        }
        // if(this.keyCode === "06" || this.keyCode === "13"){

        // }else{

        // }
  
  
  
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
  