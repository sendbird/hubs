AFRAME.registerComponent("keyboard-input", {
    init() {
      this.currentInput = "";
      const keyboardInput = document.createElement('a-entity');
  
      keyboardInput.setAttribute('text-button', 'color', 'red');
      keyboardInput.setAttribute('text-button', 'backgroundColor', 'white');
  
      keyboardInput.setAttribute('text-button', 'backgroundHoverColor', 'white');
      keyboardInput.setAttribute('position', '0.62 0.058 0');
      keyboardInput.setAttribute('scale', `0.5 0.07 0`);
  
      const keyboardInputText = document.createElement('a-entity');
      keyboardInputText.setAttribute('text', `value: ${this.currentInput}; color:grey; textAlign:right; width: 200; height:200`);
      keyboardInputText.setAttribute('position', '0.54 0.09 0.21');
      keyboardInputText.setAttribute('scale', '0.5 0.5 0.1');
  
      keyboardInputText.setAttribute('class', 'keyboard-button');
      this.el.appendChild(keyboardInput);
      this.el.appendChild(keyboardInputText);
      this.el.sceneEl.addEventListener("key-input", (e)=>{
        this.currentInput = e.detail.value;
        keyboardInputText.setAttribute('text', `value: ${this.currentInput};`);
  
      });
  
      this.el.sceneEl.addEventListener("key-submit", (e)=>{ 
        setTimeout(()=>{
          this.el.sceneEl.emit("incoming-message", { value:this.currentInput });
          this.currentInput = "";
          keyboardInputText.setAttribute('text', `value: ${this.currentInput};`);
  
  
        },500);
      });
  
    }
  
  });