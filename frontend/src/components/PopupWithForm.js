import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <div className={props.isOpen ? "pop-up__container pop-up__container_active": "pop-up__container"}>
        <section className={`pop-up${props.popupType}`}>
          <button onClick={props.onClose} className="pop-up__close"></button>
          <p className={`pop-up__heading${props.popupType}`}>{props.heading}</p>
          <form onSubmit={props.handleSubmit} className="pop-up__form" noValidate>
            {props.children}
            <button onClick={props.onClose} className="pop-up__save" type="submit" name="Save" >{props.buttonText}</button>
          </form>
        </section>
      </div>
    </>
  )
}
export default PopupWithForm;
