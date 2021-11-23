import { Switch, Route } from 'react-router-dom';
import BlogHome from './components/BlogHome/BlogHome';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './auth/protected-routes';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={BlogHome}></Route>
        <ProtectedRoute path="/create" component={CreateBlog}></ProtectedRoute>
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
