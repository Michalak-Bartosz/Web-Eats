import React from 'react';
import LoginForm from '../components/login.component';
import RegisterForm from '../components/register.component';

const AuthPage = () => (
    <div className="row justify-content-between">
        <div className="col-md-5">
            <LoginForm />
        </div>

        <div style={{ border: '2px solid #6e6e6e' }}></div>

        <div className="col-md-6">
            <RegisterForm />
        </div>
    </div>
);

export default AuthPage;