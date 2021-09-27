import { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import { deletePost } from "../service/api.service";
import { StyledModal, Text, GoBackButton, ConfirmButton, customStyles } from "./modalStyles";

export default function DeleteModal({ modalOpen, setModalOpen, postId }) {
    const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
    const [disabledButtons, setDisabledButtons] = useState(false);

    function deleteThisPost() {
        const token = userData.token;
        const id = postId;
        const req = deletePost(id, token);

        setDisabledButtons(true);

        req.then(() => {
            setDisabledButtons(false);
            setModalOpen(!modalOpen);
            setOnChangePost(!onChangePost)
        })
        req.catch(() => {;
            setDisabledButtons(false)
            setModalOpen(!modalOpen);
            setOnChangePost(!onChangePost)
            alert("Não foi possível excluir o post. Tente novamente.");
        })
    }

    return (
        <StyledModal isOpen={modalOpen} onRequestClose={() => setModalOpen(!modalOpen)}>
            <Text margin={disabledButtons}>
                {disabledButtons ?
                    "Excluindo..."
                :
                    "Tem certeza que deseja excluir essa publicação?"
                }
            </Text>
            {disabledButtons && <Loader type="ThreeDots" color="#ffffff" height="20px" />}
            <div>
                <GoBackButton onClick={() => setModalOpen(!modalOpen)} disabled={disabledButtons} >
                    Não, voltar
                </GoBackButton>
                <ConfirmButton onClick={deleteThisPost} disabled={disabledButtons} >
                    Sim, excluir
                </ConfirmButton>
            </div>
        </StyledModal>
    );   
}
