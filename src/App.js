import "./App.css";
import Layout from "./Layout/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Screens/Home";
import Calendar from "./Screens/Calendar";
import Search from "./Screens/Search";
import Add from "./Screens/Add";
import Users from "./Screens/Users";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Screens/Login";
import { removeToken } from "./auth/storage";
import jwt_decode from "jwt-decode";
import AuthContext from "./auth/context";
import SearchById from "./Screens/SearchById";
import Edit from "./Screens/Edit";

if (localStorage.najiToken) {
  const decode = jwt_decode(localStorage.najiToken);
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    removeToken();
  }
}
function App() {
  let links;
  let user;
  if (localStorage.najiToken) {
    user = jwt_decode(localStorage.najiToken);
    console.log(user);
    if (user.role.includes("admin")) {
      links = (
        <AuthContext.Provider value={{ user }}>
          <Layout>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/search" exact component={Search} />
              <Route path="/addevent" exact component={Add} />
              <Route path="/users" exact component={Users} />
              <Route path="/edit/:id" exact component={Edit} />
              <Route path="/search/:id" exact component={SearchById} />
              <Redirect to="/home" />
            </Switch>
          </Layout>
        </AuthContext.Provider>
      );
    } else {
      links = (
        <AuthContext.Provider value={{ user }}>
          <Layout>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/search" exact component={Search} />
              <Route path="/addevent" exact component={Add} />
              <Route path="/search/:id" exact component={SearchById} />
              <Route path="/edit/:id" exact component={Edit} />
              <Redirect to="/home" />
            </Switch>
          </Layout>
        </AuthContext.Provider>
      );
    }
  } else {
    links = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <Router>{links}</Router>;
}

export default App;
