import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/timeline/Timeline";
import Login from "./pages/acessControl/Login";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./pages/acessControl/SignUp";

import Post from "./components/Post";

export default function App() {
  const [userData, setUserData] = useState({});
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
<<<<<<< HEAD
        <Route path="/" exact>
          <Post />
        </Route>
        <Route path="/sign-up" exact></Route>
        <Route path="/timeline" exact></Route>
        <Route path="/myposts" exact></Route>
        <Route path="/my-likes" exact></Route>
        <Route path="/user/:id" exact></Route>
        <Route path="/hashtag/:hashtag" exact></Route>
=======
        <UserContext.Provider value={{ userData, setUserData }}>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/timeline" exact component={Timeline} />
          <Route path="/myposts" exact />
          <Route path="/my-likes" exact />
          <Route path="/user/:id" exact />
          <Route path="/hashtag/:hashtag" exact />
        </UserContext.Provider>
>>>>>>> main
      </Switch>
    </BrowserRouter>
  );
}
