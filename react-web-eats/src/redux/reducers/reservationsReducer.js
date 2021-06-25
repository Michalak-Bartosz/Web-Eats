import * as constants from './../constants';


export default function reservationsReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_RESERVATIONS:
            return action.payload;
        case constants.ADD_RESERVATION:
            return state.concat(action.payload);
        case constants.REMOVE_RESERVATION:
            return state.filter(item => item.id !== action.payload);
        case constants.UPDATE_RESERVATION:
            return state.map(item => {
                if(item._id === action.payload.reservationId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}