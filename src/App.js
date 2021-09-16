import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/timeline/Timeline";
import Login from "./pages/acessControl/Login";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

import Header from "./components/Header";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact />
          <Route path="/timeline" exact component={Timeline} />
          <Route path="/myposts" exact />
          <Route path="/my-likes" exact />
          <Route path="/user/:id" exact />
          <Route path="/hashtag/:hashtag" exact />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
