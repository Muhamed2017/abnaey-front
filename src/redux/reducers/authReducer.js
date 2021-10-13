import * as actions from '../../constants'
const userDefaultState = {
    user: null,
    isLoggedIn: false,
    loading: false,
}
const userInfo = JSON.parse(localStorage.getItem("user")) ?? userDefaultState;
export const firebaseEmailPasswordReducer = (state = userInfo, action) => {
    switch (action.type) {
        case actions.SIGNUP_EMAIL_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actions.SIGNUP_EMAIL_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
            }
      
        case actions.SIGNIN_EMAIL_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.SIGNIN_EMAIL_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
            }

        case actions.GOOGLE_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
            }
        case actions.FACEBOOK_SIGNUP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
            }
    
        case actions.LOGOUT:
                return {
                    ...state,
                    user:null,
                    isLoggedIn:false,
                    info:null
                }
        default:
            return state;
    }
}