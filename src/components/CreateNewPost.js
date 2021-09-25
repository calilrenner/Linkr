import { useContext, useState } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import { createNewPost } from "../service/api.service";
import { IoLocationOutline } from 'react-icons/io5';


export default function Post() {
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [buttonText, setButtonText] = useState("Publish");
  const [disabled, setDisabled] = useState(false);
  const [startLocation, setStartLocation] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const geolocation = {
      latitude,
      longitude
    }
  
  let body;

  function createPost(e) {
    e.preventDefault();
    

    setButtonText("Publishing...");
    setDisabled(true);

    if(startLocation) {
      body = { link, text, geolocation };
    } else {
      body = { link, text };
    }
    const token = userData.token;
    const req = createNewPost(body, token);

    req.then(() => {
      setOnChangePost(!onChangePost);
      setButtonText("Publish");
      setDisabled(false);
      setLink("");
      setText("");
    });
    req.catch(() => {
      alert("Houve um erro ao publicar seu link");
      setDisabled(false);
      setButtonText("Publish");
    });
  }

  function askLocation() {
    if ('geolocation' in navigator && !startLocation) {
          navigator.geolocation.getCurrentPosition((position) => 
          {
            setLongitude(position.coords.longitude)
            setLatitude(position.coords.latitude)
          }, (error) => 
          {
              alert('Não foi possível iniciar localização');
              setStartLocation(false);
          }
      )
    }
  }

  return (
    <>
      <Content>
        <Image>
          <img src={userData.user.avatar} alt={userData.user.username} />
        </Image>
        <Text>
          <p>O que você tem para favoritar hoje?</p>
          <form onSubmit={createPost}>
            <LinkInput
              type="url"
              placeholder="http://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              disabled={disabled}
            />
            <TextInput
              type="text"
              placeholder="Muito irado esse link falando de #javascript"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={disabled}
            />
            <Footer >
              <div>
                <IoLocation onClick={() => {
                  setStartLocation(!startLocation);
                  askLocation();
                }
                } startLocation={startLocation} />
                <TextLocation startLocation={startLocation}>
                  {startLocation ? 'Localização ativada' : 'Localização desativada'}
                </TextLocation>
              </div>
              <Button type="submit" disabled={disabled}>
                {buttonText}
              </Button>
            </Footer>
          </form>
        </Text>
      </Content>
    </>
  );
}

const Content = styled.div`
  width: 611px;
  height: 209px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  margin-top: 25px;

  @media (max-width: 1000px) {
    border-radius: 0;
    width: 100%;
  }
`;

const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000;
  margin: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const Text = styled.div`
  width: 503px;
  height: 100%;

  p {
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-top: 10px;
  }

  form {
    width: 100%;
    max-width: 611px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    form {
      padding: 0 15px 0 15px;
    }
  }
`;

const LinkInput = styled.input`
  width: 100%;
  height: 30px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 15px;
  padding-left: 13px;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 66px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  line-height: 18px;
  color: #949494;
  font-family: "Lato";
  resize: none;
  padding-left: 13px;
  padding-top: 8px;
  margin-bottom: 5px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > *:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Button = styled.button`
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;
  color: #fff;
  border: none;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  line-height: 17px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  align-self: flex-end;
`

const IoLocation = styled(IoLocationOutline)`
  color: ${props => props.startLocation ? '#238700' : '#949494'};
  margin-right: 2px;
`

const TextLocation = styled.span`
  color: ${props => props.startLocation ? '#238700' : '#949494'};
  font-size: 13px;
`
