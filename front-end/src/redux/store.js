import {createStore} from 'redux'
import initState from './initState'
import rootReducer from './reducers/rootReduces'



const store = createStore(rootReducer,initState)


export default store
