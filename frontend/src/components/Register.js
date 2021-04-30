import React from 'react';
import {useHistory, Link} from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    props.handleRegister(password, email)
    if (localStorage.getItem('jwt')) {
      history.push('/')
    }
  }

  return (
    <div className="login">
      <h2 className="login__heading">Sign up</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input onChange={e => setEmail(e.target.value)} className="login__input" type="text" name="email" placeholder="Email"></input>
        <input onChange={e => setPassword(e.target.value)} className="login__input" type="password" name="password" placeholder="Password"></input>
        <button className="login__submit" type="submit" name="submit">Sign up</button>
      </form>
      <Link className="login__help" to="/signin">Already a member? Log in here!</Link>
    </ div>
  )
}

export default Register;
