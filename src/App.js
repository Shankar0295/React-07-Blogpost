import { Switch, Route } from 'react-router-dom';
import BlogHome from './components/BlogHome/BlogHome';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BlogDescription from './components/BlogDescription/BlogDescription';
import ProtectedRoute from './auth/protected-routes';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={BlogHome}></Route>
        <ProtectedRoute path="/create" component={CreateBlog}></ProtectedRoute>
        <Route exact path="/:slug" component={BlogDescription}></Route>
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
