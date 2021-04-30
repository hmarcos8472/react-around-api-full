import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)


  const [name, setName] = React.useState(currentUser.name)
  const [description, setDescription] = React.useState(currentUser.about)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser(name, description, currentUser.avatar)
  }

  return (
    <PopupWithForm heading="Edit Profile" buttonText="Save" popupType="" isOpen={props.isEditOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
      <input onChange={handleNameChange} id="profile-name" name="profile name" minLength="2" maxLength="40" required className="pop-up__name-input pop-up__input" type="text" placeholder="Name" />
      <span id="profile-name-error" className="pop-up__error pop-up__error_visible"></span>
      <input onChange={handleDescriptionChange} id="profile-occupation" name="profile occupation" minLength="2" maxLength="40" required className="pop-up__occupation-input pop-up__input" type="text" placeholder="Occupation"  />
      <span id="profile-occupation-error" className="pop-up__error pop-up__error_visible"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
