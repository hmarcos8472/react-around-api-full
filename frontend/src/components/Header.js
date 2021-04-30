import React from 'react';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <>
      <header>
        <div className="header">
          <img src={logo} alt="Around the US" className="header__logo" />
          <div className= {props.hidden ? "header__menu-container_visible" : "header__menu-container"}>
            <div className={props.isHiddenLogoutOpen ? "header__menu_close" : "header__menu"} onClick={props.toggleHiddenLogout}></div>
          </div>
          <div className={props.hidden ? "header__text-container_hidden" : "header__text-container"}>
            <p className="header__user">{props.email}</p>
            <a onClick={props.signOut} href={props.link} className="header__text">{props.text}</a>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
