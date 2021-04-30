import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {
  const [newCardName, setNewCardName] = React.useState("")
  const [newCardLink, setNewCardLink] = React.useState("")

  function handleNewCardNameChange(e) {
    setNewCardName(e.target.value)
  }

  function handleNewCardLinkChange(e) {
    setNewCardLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace({
      title: newCardName,
      link: newCardLink
    })
  }

  return (
    <PopupWithForm heading="New Place" buttonText="Submit" popupType="" isOpen={props.isAddOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
      <input onChange={handleNewCardNameChange} id="image-title" name="image title" minLength="1" maxLength="30" required className="pop-up__title-input pop-up__input" type="text" placeholder="Title" />
      <span id="image-title-error" className="pop-up__error pop-up__error_visible"></span>
      <input onChange={handleNewCardLinkChange} id="image-url" name="image url" type="url" required className="pop-up__url-input pop-up__input" placeholder="Image URL" />
      <span id="image-url-error" className="pop-up__error pop-up__error_visible"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
