import {createStore} from 'redux'
import initState from './initState'



const store = createStore(todoReducer, initState)


export default store
