import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const currentUserId = currentUser._id
  const isOwn = props.card.owner._id === currentUserId
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  return (
    <>
      <li className="element__card">
        <div onClick={props.onCardImageClick} className="element__image" style={{backgroundImage:`url(${props.image})`}}>
        </div>
        <button onClick={props.onCardDelete} className={isOwn ?"element__trash_visible" :"element__trash"} type="button" name="trash"></button>
        <div className="element__caption">
          <h2 className="element__title">{props.title}</h2>
          <button onClick={props.onCardLike} className={isLiked ?"element__heart element__heart_filled" :"element__heart element__heart_empty"} type="button" name="like">
            <p className="element__likes">{props.likecount}</p>
          </button>
        </div>
      </li>
    </>
  )
}

export default Card;
