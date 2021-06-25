import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from './../redux/actions/authActionCreators';

import './login.css'


const LoginForm = ({dispatchLoginAction}) => {

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ nickname: false, password: false });


    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            updateErrorFlags();
            dispatchLoginAction(nickname, password,
                () => toast.success('Logged In Successfully!'),
                (message) => toast.error(`Error: ${message}`));
        }
    };

    const handleCancelForm = event => {
        event.preventDefault();
        setNickname('');
        setPassword('');
        setError({ nickname: false, password: false });
    };

    const isFormInvalid = () => (!nickname || !password);

    const updateErrorFlags = () => {
        const errObj = { nickname: false, password: false };
        if (!nickname.trim()) errObj.nickname = true;
        if (!password.trim()) errObj.password = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <h2 className="mt-4">Have an Account?</h2>
            <h4>Login here</h4>
            <br />

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="nickname">Your nickname</label>
                    <input noValidate id="nickname"
                        type="nickname"
                        name="nickname"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className={`form-control ${error.nickname ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Your password</label>
                    <input noValidate id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={[password]}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>
                <button type="submit" className="btn btn-primary mr-4">
                    Login | <i className="fas fa-sign-in-alt"></i>
                </button>
                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-window-close"></i>
                </button>
            </form>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchLoginAction: (nickname, password, onSuccess, onError) =>
    dispatch(loginUser({ nickname, password }, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(LoginForm);