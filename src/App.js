import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/timeline/Timeline";
import Login from "./pages/acessControl/Login";
import Hashtag from "./pages/timeline/Hashtag";
import { useState, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./pages/acessControl/SignUp";
import MyPosts from "./pages/MyPosts";
import UserPosts from "./pages/UserPosts";

export default function App() {
  const [userData, setUserData] = useState({});
  const LOCAL_STORAGE_KEY = 'loggedUser.data';

  useEffect(() => {
    const userDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      setUserData(JSON.parse(userDataJSON));
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

console.log(userData.user)
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ userData, setUserData }}>
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
