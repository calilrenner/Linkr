import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/timeline/Timeline";
import Login from "./pages/acessControl/Login";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./pages/acessControl/SignUp";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/timeline" exact></Route>
          <Route path="/sign-up" exact></Route>
          <Route path="/timeline" exact component={Timeline}></Route>
          <Route path="/myposts" exact></Route>
          <Route path="/my-likes" exact></Route>
          <Route path="/user/:id" exact></Route>
          <Route path="/hashtag/:hashtag" exact></Route>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
