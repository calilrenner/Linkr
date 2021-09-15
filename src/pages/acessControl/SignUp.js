import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Container, Form, TitleContainer } from "./accesControlStyles";
import Loader from "react-loader-spinner";

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  function handleSignInSubmit(e) {
    e.preventDefault();
    setDisableForm(true);
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
      <Form onSubmit={handleSignInSubmit}>
        <input
          disabled={disableForm}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={disableForm}
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          disabled={disableForm}
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          disabled={disableForm}
          type="text"
          placeholder="picture url"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
        />
        <button disabled={disableForm} type="submit">
          {disableForm ? (
            <Loader type="ThreeDots" color="#ffffff" height="45px" />
          ) : (
            "Sign Up"
          )}
        </button>
        <Link to="/sign-up">Switch back to log in</Link>
      </Form>
    </Container>
  );
}
