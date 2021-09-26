import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import { StyledModal, Text, GoBackButton, ConfirmButton, customStyles } from "./modalStyles";
import UserContext from "../contexts/UserContext";
import { repost } from "../service/api.service";

export default function Repost({ postId, repostCount }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const { userData, onChangePost ,setOnChangePost } = useContext(UserContext);

    function repostThisPost() {
        setDisabledButtons(true);

        const id = postId;
        const token = userData.token;
        const req = repost(id, token);

        req.then(() =>{
            repostCount++;
            setOnChangePost(!onChangePost);
            setModalOpen(!modalOpen);
        })
        req.catch(() => {
            setDisabledButtons(false)
            setModalOpen(!modalOpen);
            alert("Houve uma falha ao repostar. Tente novamente.")
        })
    }

    return (
        <>
            <Box>
                <Icon onClick={() => setModalOpen(!modalOpen)} />
                <Quantity>
                    {repostCount} {repostCount === 1 ? "re-post" : "re-posts"}
                </Quantity>
            </Box>
            <StyledModal style={customStyles} isOpen={modalOpen} onRequestClose={() => setModalOpen(!modalOpen)}>
                <Text margin={disabledButtons}>
                    {disabledButtons ?
                        "Re-posting..."
                    :
                        "Do you want to re-post this link?"
                    }
                </Text>
                {disabledButtons && <Loader type="ThreeDots" color="#ffffff" height="20px" />}
                <div>
                    <GoBackButton onClick={() => setModalOpen(!modalOpen)} disabled={disabledButtons} >
                        No, cancel
                    </GoBackButton>
                    <ConfirmButton onClick={repostThisPost} disabled={disabledButtons} >
                        Yes, share!
                    </ConfirmButton>
                </div>
            </StyledModal>
        </>
    );
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon = styled(BiRepost)`
    margin-top: 15px;
    font-size: 20px;
    cursor: pointer;
`;

const Quantity = styled.p`
    font-size: 11px;
    text-align: center;
`;