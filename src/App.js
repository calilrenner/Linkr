import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

export default function App() {
  const mockedUser = {
    token: "639d821c-9377-476b-84b6-3ef4778a5e2c",
    user: {
      id: 483,
      email: "leo@leo.com",
      username: "leoguzi",
      avatar:
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/483/avatar",
    },
  };
  const [user, setUser] = useState(mockedUser);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact></Route>
          <Route path="/sign-up" exact></Route>
          <Route path="/timeline" exact></Route>
          <Route path="/myposts" exact></Route>
          <Route path="/my-likes" exact></Route>
          <Route path="/user/:id" exact></Route>
          <Route path="/hashtag/:hashtag" exact></Route>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
