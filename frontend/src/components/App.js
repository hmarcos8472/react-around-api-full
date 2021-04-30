import React from 'react';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from './Header.js'
import Main from './Main.js'
import Card from './Card.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ImagePopup from './ImagePopup.js'
import Login from './Login.js'
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js'
import InfoToolTip from './InfoToolTip.js'
import api from '../utils/Api.js'
import * as auth from "../utils/auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function App() {

  const [isOverlayOn, setIsOverlayOn] = React.useState(false)

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false)
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isInfoOpen, setIsInfoOpen] = React.useState(false)
  const [isHiddenLogoutOpen, setIsHiddenLogoutOpen] = React.useState(false)

  const [isImageOpen, setIsImageOpen] = React.useState(false)
  const [image, setImage] = React.useState("")
  const [imageCaption, setImageCaption] = React.useState("")

  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("")

  const [loginSuccess, setLoginSuccess] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] =React.useState("")
  const history = useHistory()



  const [currentUser, setCurrentUser] = React.useState({avatar: "", name: "", about: ""})
  React.useEffect(() => {
    api.getUserInfo().then(res => {
      setCurrentUser(res)
    })
  }, [setCurrentUser])

  function closeAllPopups() {
    setIsOverlayOn(false)
    setIsAddOpen(false)
    setIsEditOpen(false)
    setIsImageOpen(false)
    setIsAvatarOpen(false)
    setIsInfoOpen(false)
  }

  function onUpdateUser(name, about) {
    api.setUserInfo({name:currentUser.name, about: currentUser.about})
    setCurrentUser({
      name: name,
      about: about,
      avatar: currentUser.avatar
    })
  }

  function onUpdateAvatar(avatar) {
    api.setUserAvatar({avatar: currentUser.avatar})
    setCurrentUser({
      name: currentUser.name,
      about: currentUser.about,
      avatar: avatar
    })
  }

  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards().then(res => {
      setCards(res)
    })
  }, [setCards, cards])

  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.removeLike(card._id).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
    } else {
      api.likeCard(card._id).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
    }
  }

  function handleCardDelete(card){
    api.removeCard(card._id).then(
      setCards(cards)
    )
  }

  function onCardImageClick(link, caption){
    setIsImageOpen(true)
    setImage(link)
    setImageCaption(caption)
    setIsOverlayOn(true)
  }

  function onAddPlace(newCard){
    api.addCard(newCard)
  }

  function toggleInfoToolTip(){
    setIsInfoOpen(!isInfoOpen)
  }
//Register
  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if(res.data) {
          setLoginSuccess(true);
          setUserEmail(email)
          toggleInfoToolTip()
          history.push('/');
        }
        else {
          setLoginSuccess(false);
          toggleInfoToolTip()
          return;
        }
      })
      .catch(err => console.log(err));
  }
//Login
  function handleLogin(password, email) {
      if(!email || !password) return;

      auth.authorize(password, email)
      .then((data) => {
        if (!data) {
          setLoginSuccess(false)
          setEmail(email)
        }

        if(data.token) {
          setPassword('')
          setLoginSuccess(true)
          setLoggedIn(true)
          setUserEmail(email)
          history.push('/')
        }
      })
      .catch(err => console.log(err));
  }

//Logout
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/signin');
  }

  function toggleHiddenLogout() {
    setIsHiddenLogoutOpen(!isHiddenLogoutOpen)
  }

  return (
    <Switch>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className={isOverlayOn ? "overlay overlay_dark" : "overlay"}>
        <InfoToolTip isValid={loginSuccess} isOpen={isInfoOpen} onClose={closeAllPopups} popupType="_type_info"/>

          <Route path="/signin">
            <Header text={"Sign up"} link={"/signup"} email={loggedIn ? email : ""} handleRegister={handleRegister} />
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path="/signup">
            <Header text={"Log in"} link={"/signin"} email={loggedIn ? email : ""}/>
            <Register handleRegister={handleRegister} toggleInfoToolTip={toggleInfoToolTip}/>
          </Route>

          <Route path='/'>
                { loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' /> }
            </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} email={userEmail} loggedIn={loggedIn} signOut={handleSignOut} isHiddenLogoutOpen={isHiddenLogoutOpen} toggleHiddenLogout={toggleHiddenLogout}
            onEditAvatar={() => {
              setIsAvatarOpen(true)
              setIsOverlayOn(true)
            }}
            onEditProfile={() => {
              setIsEditOpen(true)
              setIsOverlayOn(true)
            }}
            onAddCard={() => {
               setIsAddOpen(true)
               setIsOverlayOn(true)
            }}
            onCardImageClick={(link, caption) => {
              setIsImageOpen(true)
              setImage(link)
              setImageCaption(caption)
              setIsOverlayOn(true)
            }}
            >
            {cards.map((card, i) => {
              return (
                <Card key={i} card={card} image={card.link} title={card.name} likecount={card.likes.length}
                onCardLike={()=>{handleCardLike(card)}}
                onCardDelete={()=>{handleCardDelete(card)}}
                onCardImageClick={() => {onCardImageClick(card.link, card.name)}}
                />
              )
            })}
          </ProtectedRoute>

          <Footer />
        </div>
      <EditProfilePopup onUpdateUser={onUpdateUser} isEditOpen={isEditOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={onUpdateAvatar} isAvatarOpen={isAvatarOpen} onClose={closeAllPopups} />
      <AddPlacePopup onAddPlace={onAddPlace} isAddOpen={isAddOpen} onClose={closeAllPopups} />

      <PopupWithForm heading="Are You Sure?" buttonText="Yes" popupType="_type_delete" />

      <ImagePopup isOpen={isImageOpen} title={imageCaption} image={image} onClose={() => {
        setIsImageOpen(false)
        setIsOverlayOn(false)
      }
      }/>
      </div>
    </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
