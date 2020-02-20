import { combineReducers } from 'redux'
import { reducer as counter } from './counter'
import { reducer as data } from './data';

export default combineReducers({ counter, data })