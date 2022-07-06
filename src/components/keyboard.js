/**
 * A button with text
 * @namespace ui
 * @component keyboard
 */

 const KEYBOARD_PADDING = 0.02;
 const KEY_PADDING = 0.004;
 const KEY_SIZE = 0.06;

 AFRAME.registerComponent("keyboard", {
    schema: {
     
    },
  
    init() {
        this.keyboardKeys = {};

        this.activeMode = 'normal'; // 'normal', 'shift', 'alt'

        this.drawKeyboard = ()=>{
            this.keyboardKeys = usKeyboardDefinition;

            if (this.keyboardKeys) {
                console.log('keyboard: ', this.keyboardKeys);
                const keyRows = this.keyboardKeys[this.activeMode] || this.keyboardKeys['normal'];
                const keyboard = document.createElement('a-entity');
                const keyboardWidth = KEY_SIZE * 11 + KEY_PADDING * 10 + KEYBOARD_PADDING * 2;
                const keyboardHeight = KEY_SIZE * keyRows.length + KEY_PADDING * (keyRows.length - 1) + KEYBOARD_PADDING * 2;
                
                keyboard.setAttribute('position', `${(keyboardWidth / 2) - KEYBOARD_PADDING} ${(-keyboardHeight / 2) + KEYBOARD_PADDING} -0.01`);
                keyboard.setAttribute('geometry', `primitive: plane; width: ${keyboardWidth}; height: ${keyboardHeight}`);
                keyboard.setAttribute('material', 'color: #4a4a4a; side: double; opacity: 0.7');

                this.el.appendChild(keyboard);

                let positionY = 0;
                for (let i = 0; i < keyRows.length; i++) {
                    const keys = keyRows[i];
                    let positionX = 0;
                    for (let j = 0; j < keys.length; j++) {
                    const keyObject = keys[j];
                    const key = this.parseKeyObjects(keyObject);
                    if (!this.dismissable && keyObject.type === 'cancel') {
                        continue;
                    }
                    const width = key.size.split(' ')[0];
                    const height = key.size.split(' ')[1];
                    console.log('keyboard:', `${positionX + width / 2} ${positionY - height / 2} 0`);
                    this.drawButton({
                        key,
                        position: `${positionX + width / 2} ${positionY - height / 2} 0`,
                    });
                    positionX += parseFloat(width) + KEY_PADDING;

                    if (keys.length === (j + 1)) {
                        positionY -= KEY_SIZE + KEY_PADDING;
                    }
                    }
                }
            }
        }
        this.drawButton = (options)=>{
            const key = options.key;
            const width = key.size.split(' ')[0];
            const height = key.size.split(' ')[1];
            const buttonContainer = document.createElement('a-entity');
            buttonContainer.setAttribute('sprite', '');
            buttonContainer.setAttribute('is-remote-hover-target', '');
            buttonContainer.setAttribute('tags', 'singleActionButton:true;');
            buttonContainer.setAttribute('text-button', 'color', 'white');
            buttonContainer.setAttribute('text-button', 'backgroundColor', '#343434');
            buttonContainer.setAttribute('text-button', 'backgroundHoverColor', '#818181');
            buttonContainer.setAttribute('keyboard-button', '');
            buttonContainer.setAttribute('position', options.position);
            buttonContainer.setAttribute('scale', `${KEY_SIZE} ${KEY_SIZE} ${KEY_SIZE}`);
    
            const button = document.createElement('a-entity');
            const text = document.createElement('a-entity');
            button.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height};`);
            text.setAttribute('key-code', key.code);
            text.setAttribute('text', `value: ${key.value}; textAlign:center; width: 10; height:10`);
            text.setAttribute('position', '0 0 0.01');
            text.setAttribute('scale', '3 3 3');
            text.setAttribute('class', 'keyboard-button');


            buttonContainer.appendChild(button);  
    
            buttonContainer.appendChild(text);  
    
    
            this.el.appendChild(buttonContainer);
        }

        this.parseKeyObjects =(keyObject) => {
            const type = keyObject.type;
            const value = keyObject.value;
            switch (type) {
              case 'delete':
                return {size: `${KEY_SIZE} ${KEY_SIZE} 0`, value, code: '8'};
              case 'enter':
                return {size: `${KEY_SIZE} ${(KEY_SIZE * 2) + KEY_PADDING} 0`, value, code: '13'};
              case 'shift':
                return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '16'};
              case 'alt':
                return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '18'};
              case 'space':
                return {size: `${(KEY_SIZE * 5) + (KEY_PADDING * 4)} ${KEY_SIZE} 0`, value, code: '32'};
              case 'cancel':
                // ASCII "CAN" used for cancel event
                return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '24'};
              case 'submit':
                // ASCII "ACK" used for submit events
                return {size: `${(KEY_SIZE * 2) + KEY_PADDING} ${KEY_SIZE} 0`, value, code: '06'};
              default:
                return {size: `${KEY_SIZE} ${KEY_SIZE} 0`, value, code: value.charCodeAt(0)};
            }
          }
        // this.drawButton();
        this.drawKeyboard();

    }
  

  });

  const usKeyboardDefinition = {
    name: 'ms-US-International',
    normal: [
      [
        {value: '1', type: 'standard'},
        {value: '2', type: 'standard'},
        {value: '3', type: 'standard'},
        {value: '4', type: 'standard'},
        {value: '5', type: 'standard'},
        {value: '6', type: 'standard'},
        {value: '7', type: 'standard'},
        {value: '8', type: 'standard'},
        {value: '9', type: 'standard'},
        {value: '0', type: 'standard'},
        {value: '<-', type: 'delete'},
      ],
      [
        {value: 'q', type: 'standard'},
        {value: 'w', type: 'standard'},
        {value: 'e', type: 'standard'},
        {value: 'r', type: 'standard'},
        {value: 't', type: 'standard'},
        {value: 'y', type: 'standard'},
        {value: 'u', type: 'standard'},
        {value: 'i', type: 'standard'},
        {value: 'o', type: 'standard'},
        {value: 'p', type: 'standard'},
        {value: 'Ent', type: 'enter'},
      ],
      [
        {value: 'a', type: 'standard'},
        {value: 's', type: 'standard'},
        {value: 'd', type: 'standard'},
        {value: 'f', type: 'standard'},
        {value: 'g', type: 'standard'},
        {value: 'h', type: 'standard'},
        {value: 'j', type: 'standard'},
        {value: 'k', type: 'standard'},
        {value: 'l', type: 'standard'},
        {value: '"', type: 'standard'},
        // last one empty because Enter key spans 2 rows
      ],
      [
        {value: 'Shift', type: 'shift'},
        {value: 'z', type: 'standard'},
        {value: 'x', type: 'standard'},
        {value: 'c', type: 'standard'},
        {value: 'v', type: 'standard'},
        {value: 'b', type: 'standard'},
        {value: 'n', type: 'standard'},
        {value: 'm', type: 'standard'},
        {value: 'Alt', type: 'alt'},
      ],
      [
        {value: 'Cancel', type: 'cancel'},
        {value: '', type: 'space'},
        {value: ',', type: 'standard'},
        {value: '.', type: 'standard'},
        {value: 'Submit', type: 'submit'},
      ],
    ],
    shift: [
      [
        {value: '1', type: 'standard'},
        {value: '2', type: 'standard'},
        {value: '3', type: 'standard'},
        {value: '4', type: 'standard'},
        {value: '5', type: 'standard'},
        {value: '6', type: 'standard'},
        {value: '7', type: 'standard'},
        {value: '8', type: 'standard'},
        {value: '9', type: 'standard'},
        {value: '0', type: 'standard'},
        {value: '<-', type: 'delete'},
      ],
      [
        {value: 'Q', type: 'standard'},
        {value: 'W', type: 'standard'},
        {value: 'E', type: 'standard'},
        {value: 'R', type: 'standard'},
        {value: 'T', type: 'standard'},
        {value: 'Y', type: 'standard'},
        {value: 'U', type: 'standard'},
        {value: 'I', type: 'standard'},
        {value: 'O', type: 'standard'},
        {value: 'P', type: 'standard'},
        {value: 'Ent', type: 'enter'},
      ],
      [
        {value: 'A', type: 'standard'},
        {value: 'S', type: 'standard'},
        {value: 'D', type: 'standard'},
        {value: 'F', type: 'standard'},
        {value: 'G', type: 'standard'},
        {value: 'H', type: 'standard'},
        {value: 'J', type: 'standard'},
        {value: 'K', type: 'standard'},
        {value: 'L', type: 'standard'},
        {value: '"', type: 'standard'},
        // last one empty because Enter key spans 2 rows
      ],
      [
        {value: 'Shift', type: 'shift'},
        {value: 'Z', type: 'standard'},
        {value: 'X', type: 'standard'},
        {value: 'C', type: 'standard'},
        {value: 'V', type: 'standard'},
        {value: 'B', type: 'standard'},
        {value: 'N', type: 'standard'},
        {value: 'M', type: 'standard'},
        {value: 'Alt', type: 'alt'},
      ],
      [
        {value: 'Cancel', type: 'cancel'},
        {value: '', type: 'space'},
        {value: ',', type: 'standard'},
        {value: '.', type: 'standard'},
        {value: 'Submit', type: 'submit'},
      ],
    ],
    alt: [
      [
        {value: '1', type: 'standard'},
        {value: '2', type: 'standard'},
        {value: '3', type: 'standard'},
        {value: '4', type: 'standard'},
        {value: '5', type: 'standard'},
        {value: '6', type: 'standard'},
        {value: '7', type: 'standard'},
        {value: '8', type: 'standard'},
        {value: '9', type: 'standard'},
        {value: '0', type: 'standard'},
        {value: '<-', type: 'delete'},
      ],
      [
        {value: '~', type: 'standard'},
        {value: '`', type: 'standard'},
        {value: '|', type: 'standard'},
        {value: '(', type: 'standard'},
        {value: ')', type: 'standard'},
        {value: '^', type: 'standard'},
        {value: '_', type: 'standard'},
        {value: '-', type: 'standard'},
        {value: '=', type: 'standard'},
        {value: '!', type: 'standard'},
        {value: 'Ent', type: 'enter'},
      ],
      [
        {value: '@', type: 'standard'},
        {value: '#', type: 'standard'},
        {value: '$', type: 'standard'},
        {value: '%', type: 'standard'},
        {value: '*', type: 'standard'},
        {value: '[', type: 'standard'},
        {value: ']', type: 'standard'},
        {value: '#', type: 'standard'},
        {value: '<', type: 'standard'},
        {value: '?', type: 'standard'},
        // last one empty because Enter key spans 2 rows
      ],
      [
        {value: 'Shift', type: 'shift'},
        {value: ':', type: 'standard'},
        {value: ';', type: 'standard'},
        {value: '{', type: 'standard'},
        {value: '}', type: 'standard'},
        {value: '/', type: 'standard'},
        {value: '\\', type: 'standard'},
        {value: '>', type: 'standard'},
        {value: 'Alt', type: 'alt'},
      ],
      [
        {value: 'Cancel', type: 'cancel'},
        {value: '', type: 'space'},
        {value: ',', type: 'standard'},
        {value: '.', type: 'standard'},
        {value: 'Submit', type: 'submit'},
      ],
    ],
  };
  
