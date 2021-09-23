import styled from "styled-components";
import ReactModal from "react-modal";
import Modal from "react-modal";

Modal.setAppElement(document.querySelector(".root"));

const StyledModal = styled(ReactModal)`
    top: 50vh;
    left: 50vw;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 597px;
    width: 100%;
    height: 262px;
    background: #333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    padding: 0 110px;

    div{
        margin-top: 20px;
    }

    @media(max-width: 1000px){
        padding: 0 10px;
    }
`;

const customStyles = {
    overlay: {zIndex: 1000}
};

const Text = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #FFF;
    margin-bottom: ${props => props.margin ? "20px" : "40px"};
    text-align: center;

    @media(max-width: 1000px){
        font-size: 25px;
        display: flex;
        text-align: center;
    }
`;

const GoBackButton = styled.button`
    width: 134px;
    height: 37px;
    background: #ffffff;
    color: #1877f2;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    margin-right: 27px;
    cursor: pointer;
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877f2;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

export { StyledModal, Text, GoBackButton, ConfirmButton, customStyles };