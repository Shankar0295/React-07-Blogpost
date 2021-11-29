import { Switch, Route } from 'react-router-dom';
import BlogHome from './components/BlogHome/BlogHome';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Header from './components/Header/Header';
import BlogDescription from './components/BlogDescription/BlogDescription';
// import ProtectedRoute from './auth/protected-routes';
// import AuthButton from './auth/authButton';
import Login from './components/Login/Login'
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={BlogHome}></Route>
        <Route path="/login" component={Login}></Route>
        {isAuthenticated ? <Route path="/create" component={CreateBlog}></Route> : <Login />}
        <Route path="/:slug" component={BlogDescription}></Route>
      </Switch>

    </div>

  );
}

export default App;
