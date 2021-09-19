import styled from "styled-components";
import ReactModal from "react-modal";
import Modal from "react-modal";

Modal.setAppElement(document.querySelector(".root"));

export default function DeleteModal({ modalOpen, setModalOpen }) {

    return (
        <StyledModal isOpen={modalOpen} onRequestClose={() => setModalOpen(!modalOpen)}>
            <Text>
                Tem certeza que deseja excluir essa publicação?
            </Text>
            <div>
                <GoBackButton onClick={() => setModalOpen(!modalOpen)}>
                    Não, voltar
                </GoBackButton>
                <ConfirmButton>
                    Sim, excluir
                </ConfirmButton>
            </div>
        </StyledModal>
    );   
}

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
    padding: 0 110px 0 110px;
`;

const Text = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #FFF;
    margin-bottom: 40px;
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