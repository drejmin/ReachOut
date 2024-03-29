import * as usersAPI from './users-api';

async function handleTokenRelatedActions(action, data) {
  const token = await usersAPI[action](data);
  if (token) {
    localStorage.setItem('token', token);
    return getUserFromToken(token);
  }
  throw new Error('Token not received');
}

export const signUp = (userData) => handleTokenRelatedActions('signUp', userData);
export const login = (credentials) => handleTokenRelatedActions('login', credentials);

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = parseJwt(token);
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

function getUserFromToken(token) {
  const payload = parseJwt(token);
  return payload ? payload.user : null;
}

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Error parsing JWT', e);
    return null;
  }
}

export const getUser = () => {
  const token = getToken();
  return getUserFromToken(token);
}

export function checkToken() {
  return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr));
}


// import * as usersAPI from './users-api';

// export async function signUp(userData){
//     const token = await usersAPI.signUp(userData);
//     localStorage.setItem('token', token);
//     return getUser();
// }

// export async function login(credentials) {
//     // Delegate the AJAX request to the users-api.js
//     // module.
//     const token = await usersAPI.login(credentials);
//     localStorage.setItem('token', token);
//     return getUser();
//   }
  
// export function logOut() {
//     localStorage.removeItem('token');
//   }

// export function getToken() {
//     // getItem returns null if there's no string
//     const token = localStorage.getItem('token');
//     if (!token) return null;
//     // Obtain the payload of the token
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     // A JWT's exp is expressed in seconds, not milliseconds, so convert
//     if (payload.exp < Date.now() / 1000) {
//       // Token has expired - remove it from localStorage
//       localStorage.removeItem('token');
//       return null;
//     }
//     return token;
//   }
  
//   export function getUser() {
//     const token = getToken();
//     // If there's a token, return the user in the payload, otherwise return null
//     return token ? JSON.parse(atob(token.split('.')[1])).user : null;
//   }

//   export function checkToken(){
//     //we cant forget how to use .then with promises
//     return usersAPI.checkToken()
//     //checkToken returns a string, but make sure
//     //it is a date object for more flexibility
//     .then(dateStr => new Date(dateStr));
//   }

