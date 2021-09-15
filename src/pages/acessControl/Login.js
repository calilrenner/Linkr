import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, TitleContainer, Form } from "./accesControlStyles";
import { serverLogin } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (email && password) {
      const userData = {
        email: email,
        password: password,
      };
      serverLogin(userData).then(login).catch(handleError);
    }
  }

  function login(user) {
    setUser(user);
    history.push("/timeline");
  }

  function handleError(e) {
    //implement exeptions later
    console.log(e.response.status);
  }

  return (
    <Container>
      <TitleContainer>
        <h1>linkr</h1>
        <h2>
          save, share and discover
          <br /> the best liks on the web
        </h2>
      </TitleContainer>
      <Form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <Link to="/sign-up">First time? Create an account!</Link>
      </Form>
    </Container>
  );
}
