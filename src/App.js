import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/Timeline";
import Login from "./pages/acessControl/Login";
import Hashtag from "./pages/Hashtag";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./pages/acessControl/SignUp";
import MyPosts from "./pages/MyPosts";
import UserPosts from "./pages/UserPosts";

export default function App() {
  const [loginData, setLoginData] = useState({});
  const LOCAL_STORAGE_KEY = "loggedUser.data";
  const userDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  let userData;

  if (userDataJSON) {
    userData = JSON.parse(userDataJSON);
  } else {
    userData = loginData;
  }

  useEffect(() => {
    if (loginData.token) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loginData));
    }
  }, [loginData]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ userData, setLoginData }}>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/timeline" exact component={Timeline} />
          <Route path="/my-posts" exact component={MyPosts} />
          <Route path="/my-likes" exact />
          <Route path="/user/:id" exact component={UserPosts} />
          <Route path="/hashtag/:hashtag" exact component={Hashtag} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
