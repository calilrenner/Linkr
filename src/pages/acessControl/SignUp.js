import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Container, Form, TitleContainer } from "./accesControlStyles";
import { registerUser } from "../../service/api.service";
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
    if (email && password && username && pictureUrl) {
      const newUserData = {
        email: email,
        password: password,
        username: username,
        pictureUrl: pictureUrl,
      };
      registerUser(newUserData).then(redirect).catch(handleError);
    } else {
      alert("Preencha todos os campos!");
      setDisableForm(false);
    }
  }

  function redirect() {
    setDisableForm(false);
    history.push("/");
  }

  function handleError(e) {
    const error = e.response.status;
    if (error === "400") {
      alert("O email inserido já está cadastrado");
    } else {
      alert("Ocorreu um erro inesperado");
    }
    setDisableForm(false);
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
          placeholder="password"
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
        <Link to="/">Switch back to log in</Link>
      </Form>
    </Container>
  );
}
