AFRAME.registerComponent("keyboard-button", {
    init() {
  
      this.onClick = () => {
        console.log("keyboard clicked")
        const keyboardButton = this.el.querySelector('.keyboard-button');
        const keyboardButtonText = keyboardButton.getAttribute('text');
        const keyCode = keyboardButton.getAttribute('key-code');
        if(keyCode === "06"){
          console.log("submit")
  
          this.el.sceneEl.emit("key-submit");
        }else{
          console.log("clicked")
          let value = keyboardButtonText.value;
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
  