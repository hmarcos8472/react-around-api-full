import React from 'react';

function InfoToolTip(props) {
  return (
    <div className={props.isOpen ? "pop-up__container pop-up__container_active": "pop-up__container"}>
      <section className={`pop-up${props.popupType}`}>
        <button onClick={props.onClose} className="pop-up__close"></button>
        <div className={props.isValid ? "pop-up__image pop-up__image_success" : "pop-up__image pop-up__image_fail"}></div>
        <p className="pop-up__text">{props.isValid ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</p>
      </section>
    </div>
  )
}

export default InfoToolTip;
