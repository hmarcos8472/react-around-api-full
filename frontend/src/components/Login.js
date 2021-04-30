import React from 'react';
import { Link, useHistory} from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(password, email)
    if(localStorage.getItem('jwt')) {
      history.push('/')
    }
  }

  return (
    <div className="login">
      <h2 className="login__heading">Log in</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input onChange={e => setEmail(e.target.value)} className="login__input" type="text" name="email" placeholder="Email"></input>
        <input onChange={e => setPassword(e.target.value)} className="login__input" type="password" name="password" placeholder="Password"></input>
        <button className="login__submit" type="submit" name="submit">Log in</button>
      </form>
      <Link className="login__help" to="/signup">Not a member yet? Sign up here!</Link>
    </div>
  )
}

export default Login;
