import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = {
    method,
    headers: { ...(payload && { 'Content-Type': 'application/json' }) }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Bad Request');
  }
  
  return response.json();
}


// import { getToken } from "./users-service";

// export default async function sendRequest(url, method= 'GET', payload='null'){
// //Fetch accepts an options object as the 2nd argument
// // used to include a data payload, set headers, specify the method, etc.
//     const options={ method };
//     if (payload){
//         options.headers={ 'Content-Type': 'application/json'};
//         options.body= JSON.stringify(payload);
//     }
//     const token = getToken();
//     if (token){
//         //need to add an authorization header
//         //Use the logical or assignment operator
//         options.headers ||= {};
//         // options.headers = options.headers ||= {}; is the older approach
//         options.headers.Authorization = `Bearer ${token}`;
//     }
//     const res = await fetch(url, options);
//     //if res.ok is false then something went wrong
//     if (res.ok) return res.json();
//     throw new Error('Bad Request');
// }