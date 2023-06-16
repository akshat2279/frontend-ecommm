import { persistStore } from 'redux-persist';
import {persistedReducer} from './reducers/index'
import rootReducer from "./reducers/index"
import {legacy_createStore as createStore} from 'redux';


const store = createStore(persistedReducer);
export let p = persistStore(store);
export default store;