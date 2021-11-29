import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LogOut.css'

const LogOut = () => {
    const { logout } = useAuth0();
    return (
        <div className="logout-container">
            <button
                className="logout-btn"
                onClick={() =>
                    logout({
                        // returnTo: `https://dev-1hzqwdml.us.auth0.com/v2/logout?returnTo=http%3A%2F%2F ${window.location.origin}/login&client_id=uwyH9KIrsOchSrL5A8Frh7hOrbGgvCNu`
                        returnTo: "https://dev-1hzqwdml.us.auth0.com/v2/logout?returnTo=" + window.location.origin + "/login&client_id=uwyH9KIrsOchSrL5A8Frh7hOrbGgvCNu"
                        // returnTo: window.location.origin,
                    })
                }
            >
                Log Out
      </button>
        </div>
    );
};

export default LogOut;