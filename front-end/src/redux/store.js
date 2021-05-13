import {createStore} from 'redux'
import initState from './initState'



const store = createStore(initState())


export default store
