const USER_LIST_WIDTH = 0.4;
const USER_ITEM_HEIGHT = 0.08;
const BORDER_WIDTH = 0.002;

AFRAME.registerComponent("channel-list", {
  init() {
    const users = ["Frontend", "Backend", "UX", "Data Science"];
    const USER_LIST_HEIGHT = USER_ITEM_HEIGHT * users.length;
    const SUBMIT_BUTTON_TOP = 0-(USER_LIST_HEIGHT/2) - (USER_ITEM_HEIGHT/2);
    const userListContainer = document.createElement('a-entity');
    userListContainer.setAttribute('position', '0 0 0');
    userListContainer.setAttribute('scale', `${USER_LIST_WIDTH} ${USER_LIST_HEIGHT} 0`);
    userListContainer.setAttribute('slice9', `opacity: 0.8;color: grey;`);
    this.el.appendChild(userListContainer);

    const submitButton = document.createElement('a-entity');
    submitButton.setAttribute('sprite', '');
    submitButton.setAttribute('is-remote-hover-target', '');
    submitButton.setAttribute('tags', 'singleActionButton:true;');
    submitButton.setAttribute('text-button', 'color', 'red');
    submitButton.setAttribute('text-button', 'backgroundColor', '#4da6ff');
    submitButton.setAttribute('text-button', 'backgroundHoverColor', '#1a8cff');
    submitButton.setAttribute('scale', `${USER_LIST_WIDTH} ${USER_ITEM_HEIGHT} 0.0005`);
    submitButton.setAttribute('position', `0 ${SUBMIT_BUTTON_TOP} 0.0006`);
    submitButton.object3D.addEventListener("interact", ()=>{
      this.el.sceneEl.emit("start-chat",{});
      this.el.setAttribute("visible","false")

    });

    this.el.appendChild(submitButton);

    const submitText = document.createElement('a-entity');

    submitText.setAttribute('text', `value: Join Chat; textAlign:left; width: 1; height:1; color: white; opacity:1;`);
    submitText.setAttribute('scale', '2 2 0.07');
    submitText.setAttribute('position', `0 0 0.0006`);
    submitText.setAttribute('scale', `0.4 0.4 0`);
    submitText.setAttribute('position', `0 ${SUBMIT_BUTTON_TOP} 0.0006`);
    this.el.appendChild(submitText);


    for (let i = 0; i < users.length; i++) {
      const USER_ITEM_TOP_POSITION = ((USER_LIST_HEIGHT/2) - (USER_ITEM_HEIGHT/2)) - (USER_ITEM_HEIGHT * i);
      const userListItem = document.createElement('a-entity');

      userListItem.setAttribute('position', `0 ${USER_ITEM_TOP_POSITION} 0.0005`);
      userListItem.setAttribute('slice9', `opacity: 0.6;color: white;height:${USER_ITEM_HEIGHT-BORDER_WIDTH};width:${USER_LIST_WIDTH}`);
      userListItem.setAttribute('position', `0 ${USER_ITEM_TOP_POSITION} 0.0005`);

      
      this.el.appendChild(userListItem);

      const button = document.createElement('a-entity');
      button.setAttribute('sprite', '');
      button.setAttribute('is-remote-hover-target', '');
      button.setAttribute('tags', 'singleActionButton:true;');
      button.setAttribute('text-button', 'color', 'white');
      button.setAttribute('text-button', 'backgroundColor', '#343434');
      button.setAttribute('text-button', 'backgroundHoverColor', '#818181');
      button.setAttribute('scale', `${USER_LIST_WIDTH} ${USER_ITEM_HEIGHT-BORDER_WIDTH} 0`);


      userListItem.appendChild(button)


      const text = document.createElement('a-entity');
      text.setAttribute('text', `value: ${users[i]}; textAlign:left; width: 10; height:10; color: black; opacity:1;`);
      text.setAttribute('scale', '0.3 0.3 0.05');
      text.setAttribute('position', `0 0 0.0006`);

      userListItem.appendChild(text)
    }


  },

  play() {


  },

  pause() {
  },

});
