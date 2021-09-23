import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { StyledModal, Text, GoBackButton, ConfirmButton, customStyles } from "./modalStyles";

export default function Repost() {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState(false);

    function repostThisPost() {
        setDisabledButtons(true);
    }

    return (
        <>
            <Box>
                <Icon onClick={() => setModalOpen(!modalOpen)} />
                <Quantity>
                    1 comment
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