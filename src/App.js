import styled from "styled-components";
import { GlobalStyle, colors } from "./globalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Post from "./components/Post";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          <Post />
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

const Teste = styled.h1`
  color: ${colors.blue};
`;
