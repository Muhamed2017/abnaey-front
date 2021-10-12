import { auth, googleProvider, facebookProvider } from './../../firebase';
import axios from 'axios'

import { toast, Flip, Bounce } from 'react-toastify';
import * as actions  from './../../constants';

export const emailPasswordSignup = () => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_REQUEST
})
export const emailPasswordSignin = () => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_REQUEST
})