import { Switch, Route } from "react-router-dom";
import BlogHome from "./components/BlogHome/BlogHome";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Header from "./components/Header/Header";
import BlogDescription from "./components/BlogDescription/BlogDescription";
import Login from "./components/Login/Login";
import ProtectedRoute from "./auth/protected-routes";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={BlogHome}></Route>
        <Route path="/login" component={Login}></Route>
        <ProtectedRoute path="/create" component={CreateBlog}></ProtectedRoute>
        <Route path="/:slug" component={BlogDescription}></Route>
      </Switch>
    </div>
  );
}

export default App;
