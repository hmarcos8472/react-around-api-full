import React from 'react';

function ImagePopup(props) {
  return (
    <>
      <div className={props.isOpen ? "element__pop-up-container element__pop-up-container_display": "element__pop-up-container"}>
        <div className="element__pop-up" style={{backgroundImage:`url(${props.image})`}} >
          <button onClick={props.onClose} type="button" name="close" className="pop-up__close_image"></button>
          <p className="element__tag">{props.title}</p>
        </div>
      </div>
    </>
  )
}

export default ImagePopup;
