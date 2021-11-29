// component not used
import React from 'react';
import Login from '../components/Login/Login';
import LogOut from '../components/LogOut/LogOut';

import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogOut /> : <Login />;
};

export default AuthButton;