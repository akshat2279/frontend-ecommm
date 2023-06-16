import change from './cartchange';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import savelogin from './savelogin';
import addtocart from './addtocart';

const a = {
    key:'root',
    storage,
}
const rootReducer = combineReducers({
    change,savelogin
});
export default rootReducer;

export const persistedReducer = persistReducer(a,rootReducer);