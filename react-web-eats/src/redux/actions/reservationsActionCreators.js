import * as constants from './../constants';


export const fetchAllReservations = (customerId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/getUserReservations/${customerId}`,
        success: (response) => (setAllReservations(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const createReservation = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/addReservation',
        data,
        succes: (reservation) => (addReservation(reservation)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getReservationById = (reservationId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/getReservation/${reservationId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateReservationById = (reservationId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/api/updateReservation/${reservationId}`,
        data,
        success: (reservationId, data) => (updateReservation(reservationId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteReservationById = (reservationId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/api/deleteReservation/${reservationId}`,
        success: () => (removeReservation(reservationId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addReservation = (reservation) => ({
    type: constants.ADD_RESERVATION,
    payload: reservation
});

const setAllReservations = (response) => ({
    type: constants.SET_ALL_RESERVATIONS,
    payload: response
});

const updateReservation = (reservationId, data) => ({
    type: constants.UPDATE_RESERVATION,
    payload: { reservationId, data }
});

const removeReservation = (reservationId) => ({
    type: constants.REMOVE_RESERVATION,
    payload: reservationId
});