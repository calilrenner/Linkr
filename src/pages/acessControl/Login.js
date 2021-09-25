import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, TitleContainer, Form } from "./accesControlStyles";
import { serverLogin } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";

export default function Login() {
  const { setLoginData } = useContext(UserContext);
  const history = useHistory();
  const LOCAL_STORAGE_KEY = "loggedUser.data";
  const userDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  useEffect(() => {
    if (userDataJSON) {
      login(JSON.parse(userDataJSON));
    }
<<<<<<< HEAD
  }, 
  []
  );
=======
  }, []); 
>>>>>>> main

  function handleLoginSubmit(e) {
    e.preventDefault();
    setDisableForm(true);
    if (email && password) {
      const userData = {
        email,
        password,
      };
      serverLogin(userData)
        .then((res) => {
          login(res.data);
        })
        .catch(handleError);
    } else {
      alert("Preencha todos os campos!");
      setDisableForm(false);
    }
  }

  function login(user) {
    setLoginData(user);
    setDisableForm(false);
    history.push("/timeline");
  }

  function handleError(e) {
    const errorCode = e.response.status;
    if (errorCode === 403) {
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
