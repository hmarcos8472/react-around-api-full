import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const [avatar, setAvatar] = React.useState(currentUser.avatar)

  const avatarInputRef = React.useRef(avatar)

  function handleAvatarChange(e) {
    setAvatar(avatarInputRef.current.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    props.onUpdateAvatar(avatar)
  }

  return (
    <PopupWithForm heading="Change Profile Picture" buttonText="Save" popupType="_type_avatar" isOpen={props.isAvatarOpen} onClose={props.onClose} handleSubmit={handleSubmit}>
      <input ref={avatarInputRef} onChange={handleAvatarChange} id="avatar-url" name="avatar url" type="url" required className="pop-up__url-input pop-up__avatar-input pop-up__input" placeholder="Avatar URL" />
      <span id="avatar-url-error" className="pop-up__error pop-up__error_visible"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
