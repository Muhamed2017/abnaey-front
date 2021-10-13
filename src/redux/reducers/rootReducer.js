import  { combineReducers } from 'redux';
import { firebaseEmailPasswordReducer as regularUser } from './authReducer'
const rootReducer = combineReducers({
     regularUser,
})
export default rootReducer
