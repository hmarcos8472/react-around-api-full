export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err)=>console.log(err));
}

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({identifier, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data.user) {
      localStorage.setItem('jwt', data.jwt);
      return data
    }
    else {
      return;
    }
  })
  .catch((err)=>console.log(err));
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      return data
    })
  .catch((err)=>console.log(err));
}
