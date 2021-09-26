import ReactModal from "react-modal";
import styled from "styled-components";
import { colors } from "../globalStyles";
import { MdClose } from "react-icons/md";

export default function LinkPreview({
  previewModalOpen,
  setPreviewModalOpen,
  link,
  title,
}) {
  return (
    <Preview
      isOpen={previewModalOpen}
      style={customStyles}
      onRequestClose={() => setPreviewModalOpen(!previewModalOpen)}
    >
      <div>
        <button>Open in a new tab</button>
        <MdClose onClick={() => setPreviewModalOpen(!previewModalOpen)} />
      </div>
      <iframe title={title} src={link}></iframe>
    </Preview>
  );
}

const Preview = styled(ReactModal)`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.black};
  width: 80vw;
  height: 90vh;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  top: 50vh;
  left: 50vw;
  border-radius: 8px;

  div {
    width: 100%;
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0 15px 0;
    color: ${colors.white};
  }

  div button {
    width: 138px;
    height: 31px;
    background-color: ${colors.blue};
    border-radius: 3px;
    border: none;
    color: ${colors.white};
    font-weight: bold;
  }

  iframe {
    width: 95%;
    height: 85%;
  }
`;

const customStyles = {
  overlay: { zIndex: 1000 },
};
