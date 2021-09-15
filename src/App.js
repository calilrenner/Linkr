import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Trending from "./components/Trending";
import Login from "./components/Login";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/sign-up" exact></Route>
        <Route path="/timeline" exact></Route>
        <Route path="/myposts" exact></Route>
        <Route path="/my-likes" exact></Route>
        <Route path="/user/:id" exact></Route>
        <Route path="/hashtag/:hashtag" exact></Route>
      </Switch>
    </BrowserRouter>
  );
}
