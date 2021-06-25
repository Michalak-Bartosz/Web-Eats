import { combineReducers } from 'redux';

import user from './userReducer';
import loading from './loadingReducer';
import reservations from './reservationsReducer';

const rootReducer = combineReducers({ user, loading, reservations });

export default rootReducer;