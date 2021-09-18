import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, TitleContainer, Form } from "./accesControlStyles";
import { serverLogin } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";

export default function Login() {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  const LOCAL_STORAGE_KEY_EMAIL = 'loggedUser.email';
  const LOCAL_STORAGE_KEY_PASSWORD = 'loggedUser.password';

  useEffect(() => {
    const userEmailJSON = localStorage.getItem(LOCAL_STORAGE_KEY_EMAIL);
    const userPasswordJSON = localStorage.getItem(LOCAL_STORAGE_KEY_PASSWORD);

    if(userEmailJSON !== null && userPasswordJSON !== null) {
      setEmail(JSON.parse(userEmailJSON));
      setPassword(JSON.parse(userPasswordJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EMAIL, JSON.stringify(email));
    localStorage.setItem(LOCAL_STORAGE_KEY_PASSWORD, JSON.stringify(password));
  }, [email, password]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    setDisableForm(true);
    if (email && password) {
      const userData = {
        email,
        password,
      };
      serverLogin(userData).then(res => login(res.data)).catch(handleError);
    } else {
      alert("Preencha todos os campos!");
      setDisableForm(false);
    }
  }

  function login(user) {
    setUserData(user);
    setDisableForm(false);
    history.push("/timeline");
  }

  function handleError(e) {
    const errorCode = e.response.status;
    if (errorCode === "401") {
      alert("E-mail/senha incorretos");
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
          <br /> the best links on the web
        </h2>
      </TitleContainer>
      <Form onSubmit={handleLoginSubmit}>
        <input
          disabled={disableForm}
          type="email"
          placeholder="e-mail"
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
        <button disabled={disableForm} type="submit">
          {disableForm ? (
            <Loader type="ThreeDots" color="#ffffff" height="45px" />
          ) : (
            "Log In"
          )}
        </button>
        <Link to="/sign-up">First time? Create an account!</Link>
      </Form>
    </Container>
  );
}
