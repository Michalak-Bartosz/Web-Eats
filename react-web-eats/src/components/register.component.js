import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { registerUser } from "./../redux/actions/authActionCreators";

import './register.css'

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState({ nickname: false, password: false, password1: false });

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            updateErrorFlags();
            dispatchRegisterAction( nickname, password,
                () => toast.success('Account Created Successfully!'),
                (message) => toast.error(`Error: ${message}`));
        } 
    };

    const handleCancelForm = (event) => {
        event.preventDefault();
        setNickname('');
        setPassword('');
        setPassword1('');
        setError({ nickname: false, password: false, password1: false });
    };

    const isFormInvalid = () => (!nickname || !password || !password1 || password !== password1);

    const updateErrorFlags = () => {
        const errObj = { nickname: false, password: false, password1: false};
        if (!nickname) errObj.nickname = true;
        if (!password) errObj.password = true;
        if (!password1) errObj.password1 = true;
        if (password !== password1) {
            errObj.password = true;
            errObj.password1 = true;
        }
        setError(errObj);
    };

    return (
        <React.Fragment>
            <h2 className="mt-4">New User?</h2>
            <h4>Create an account</h4>
            <br/>

            <form noValidate onSubmit={handleOnSubmit}>
                <div className="form-group">
                <label htmlFor="nickname1">Your nickname</label>
                    <input noValidate id="nickname1"
                        type="nickname"
                        name="nickname"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className={`form-control ${error.nickname ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                <label htmlFor="password1">Your Password</label>
                    <input noValidate id="password1"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>
                <div className="form-group">
                <label htmlFor="password2">Repeat Password</label>
                    <input noValidate id="password2"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        className={`form-control ${error.password1 ? 'is-invalid' : ''}`} />
                        <p className="invalid-feedback">Required</p>
                </div>
                <button type="submint" className="btn btn-primary mr-4">
                    Register | <i className="fas fa-user-plus"></i>
                </button>
                <button onClick={handleCancelForm} className="btn btn-outline-secondary">
                    Cancel | <i className="fas fa-window-close"></i>
                </button>
            </form>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchRegisterAction: (nickname, password, onSuccess, onError) => 
    dispatch(registerUser({ nickname, password }, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(RegisterForm);