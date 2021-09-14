import styled from "styled-components";

export default function Post(){
    return (
        <Content>
            <Image>
                <img src="https://st.depositphotos.com/1780879/3816/i/600/depositphotos_38166573-stock-photo-trees-with-sunbeams.jpg" alt="adf"/>
            </Image>
            <Text>
                <p>O que você tem para favoritar hoje?</p>
                <form>
                    <LinkInput type="url" placeholder="http://..." />
                    <TextInput type="text" placeholder="Muito irado esse link falando de #javascript" />
                    <Button type="submit">
                        Publicar
                    </Button>
                </form>
            </Text>
        </Content>
    );
}

const Content = styled.div`
    width: 611px;
    height: 209px;
    background: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin: 20px;
`;

const Image = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #000;
    margin: 18px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    @media (max-width: 430px) {
        display: none;
    }
`;

const Text = styled.div`
    width: 503px;
    height: 100%;

    p{
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-top: 21px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

`;

const LinkInput = styled.input`
    width: 503px;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 15px;
    padding-left: 13px;
`;

const TextInput = styled.textarea`
    width: 502px;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    font-family: 'Lato';
    resize: none;
    padding-left: 13px;
    padding-top: 8px;
`;

const Button = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    color: #FFF;
    border: none;
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    cursor: pointer;
`;