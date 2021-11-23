import React from "react";
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";


const Auth0ProviderLogin = ({ children }) => {
    const DOMAIN = "dev-1hzqwdml.us.auth0.com";
    const CLIENT_ID = "uwyH9KIrsOchSrL5A8Frh7hOrbGgvCNu";

    const history = useHistory();

    const onRedirectCallback = appState => {// eslint-disable-next-line
        history.push(appState ?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={DOMAIN}
            clientId={CLIENT_ID}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}>

            {children}

        </Auth0Provider>
    )
}

export default Auth0ProviderLogin

