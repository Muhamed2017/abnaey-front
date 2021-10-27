import { auth, googleProvider, facebookProvider} from './../../firebase';
import * as actions  from '../../constants';

export const emailPasswordSignup = () => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_REQUEST
})

export const emailPasswordSignin = () => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_REQUEST
})

export const emailPasswordSignupSuccess = user => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_SUCCESS,
    payload: user
})
export const emailPasswordSigninSuccess = user => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_SUCCESS,
    payload: user
})
export const googleSignup = () => ({
    type: actions.GOOGLE_SIGNUP_REQUEST,
})
export const googleSignupSuccess = user => ({
    type: actions.GOOGLE_SIGNUP_SUCCESS,
    payload: user
})
export const facebookSignupSuccess = user => ({
    type: actions.FACEBOOK_SIGNUP_REQUEST_SUCCESS,
    payload: user
})
export const logout = () => {
    return {
        type: actions.LOGOUT
    }
}

//firebase signup email and password
export const signupEmailPassword = (fullName, email, password) => {
    return (dispatch) => {
        dispatch(emailPasswordSignup());
            auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: fullName,
                }).then(() => {
                    const {uid, displayName, email, photoURL, phoneNumber, emailVerified}= userCredential.user
                  
                    dispatch(emailPasswordSignupSuccess({ uid, displayName, email, photoURL, phoneNumber, emailVerified }))
                    const user = {uid, displayName, email, photoURL, phoneNumber, emailVerified }
                    saveUserInLocalStorage(user);
                })
            })
    }
}

export const signinEmailPassword = (email, password)=>{
    return (dispatch) => {
        dispatch(emailPasswordSignin());
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
                const { uid, displayName, email, photoURL, phoneNumber, emailVerified } = userCredential.user

                dispatch(emailPasswordSigninSuccess({ uid, displayName, email, photoURL, phoneNumber, emailVerified }))
                const user = { uid, displayName, email, photoURL, phoneNumber, emailVerified }
                saveUserInLocalStorage(user);
        }).catch(e=>{
            console.error(e)
        })
    }
}
export const signupGoogle = () => {
    return (dispatch) => {
        auth.signInWithPopup(googleProvider).then((userCredential) => {
            const { uid, displayName, email, photoURL, phoneNumber, emailVerified } = userCredential.user
            dispatch(googleSignupSuccess({ uid, displayName, email, photoURL, phoneNumber, emailVerified }))
            const user = { uid, displayName, email, photoURL, phoneNumber, emailVerified }
            saveUserInLocalStorage(user);
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export const signupFacebook = () => {
    return (dispatch) => {
        auth.signInWithPopup(facebookProvider).then((userCredential) => {
            const { uid, displayName, email, photoURL, phoneNumber, emailVerified } = userCredential.user
            dispatch(facebookSignupSuccess({ uid, displayName, email, photoURL, phoneNumber, emailVerified }))
            const user = { uid, displayName, email, photoURL, phoneNumber, emailVerified }
            saveUserInLocalStorage(user);
        }).catch(error => {
            console.log(error.message)
        })
    }
}


const saveUserInLocalStorage=(user)=>{
    const state ={
        user:user, 
        isLoggedIn:true,
        loading:false
    }
    localStorage.setItem('user', JSON.stringify(state))
}
export const logginOut = () => {
    localStorage.removeItem('user');
    return (dispatch) => {
        dispatch(logout())
    }
}