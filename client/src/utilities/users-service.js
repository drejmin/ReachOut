import * as usersAPI from './usersAPI';

export async function signUp(userData){
    const token = await usersAPI.signUp(userData);
    return token;
}