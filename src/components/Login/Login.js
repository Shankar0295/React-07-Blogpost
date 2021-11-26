import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button className="btn btn-primary btn-block" onClick={() => loginWithRedirect({
            appState: {
                returnTo: '/create'
            }
        })}>Login</button>
    )
}

export default Login;