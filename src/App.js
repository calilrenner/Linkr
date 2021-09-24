import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Timeline from "./pages/Timeline";
import Login from "./pages/acessControl/Login";
import Hashtag from "./pages/Hashtag";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignUp from "./pages/acessControl/SignUp";
import MyPosts from "./pages/MyPosts";
import MyLikes from "./pages/MyLikes";
import UserPosts from "./pages/UserPosts";

export default function App() {
  const [userData, setUserData] = useState({});
  const [onChangePost, setOnChangePost] = useState(false);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider
          value={{ userData, setUserData, onChangePost, setOnChangePost }}
        >
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/timeline" exact component={Timeline} />
          <Route path="/my-posts" exact component={MyPosts} />
          <Route path="/my-likes" exact component={MyLikes} />
          <Route path="/user/:id" exact component={UserPosts} />
          <Route path="/hashtag/:hashtag" exact component={Hashtag} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
