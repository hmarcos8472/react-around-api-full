import React from 'react';

function HiddenLogout(props) {
  return (
    <>
      <div className={props.isHiddenLogoutOpen ? "hiddenlogout" : "hiddenlogout_closed"}>
        <p className="hiddenlogout__user">{props.email}</p>
        <a onClick={props.signOut} href="/signin" className="hiddenlogout__text">Log out</a>
      </div>
    </>
  )
}

export default HiddenLogout;
