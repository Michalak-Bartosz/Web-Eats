import * as constants from "./../constants";

export const registerUser = (data, onSucess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/addCustomer',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSucess,
        postProcessError: onError
    }
});

export const loginUser = (data, onSucess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/logInCustomer',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSucess,
        postProcessError: onError
    }
});

export const logoutUser = () => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/logOutCustomer',
        data: { nickname: JSON.parse(localStorage.getItem('USER_INFO')).nickname },
        success: () => (clearUserInfo()),
    }

});

const setUserInfo = (response) => {
    const userInfo = {
        userId: response.userId,
        nickname: response.nickname,
        isLoggedIn: true
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type: constants.SET_USER_INFO, payload: userInfo};
};

const clearUserInfo = () => {
    localStorage.removeItem('USER_INFO');
    return { type: constants.RESET_USER_INFO };
}