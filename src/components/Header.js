import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useContext, useState } from "react";

import {colors} from "../globalStyles";
import UserContext from "../contexts/UserContext";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const { userData, setUserData } = useContext(UserContext);

    function logout(){
        setUserData(undefined);
    }

    return (
        <>
            <Content>
                <Link to="/timeline"><h1>linkr</h1></Link>
                <div>
                    {!showMenu ? 
                        <ArrowDown onClick={() => setShowMenu(!showMenu)}/> 
                        : 
                        <ArrowUp onClick={() => setShowMenu(!showMenu)}/>
                    }
                    <Image onClick={() => setShowMenu(!showMenu)}>
                        <img src={userData.user.avatar} alt={userData.user.username} /> 
                    </Image>
                </div>
            </Content>
            <Background display={showMenu} onClick={() => setShowMenu(!showMenu)}/>
            <DropDown top={showMenu}>
                <Link to="/my-posts" style={{ textDecoration: "none" }}><p>My posts</p></Link>
                <Link to="/my-likes" style={{ textDecoration: "none" }}><p>My likes</p></Link>
                <Link to="/" style={{ textDecoration: "none" }} onClick={logout}><p className="logout">Logout</p></Link>
            </DropDown>
        </>
    );
}

const Content = styled.div`
    background-color: ${colors.black};
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 28px;
    padding-right: 17px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    h1{
        font-family: 'Passion One', cursive;
        color: ${colors.white};
        font-weight: bold;
        font-size: 49px;
        line-height: 54px;
    }

    div{
        display: flex;
        align-items: center;
    }
`;

const Image = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #c3c3c3;
    
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
`;

const ArrowDown = styled(IoIosArrowDown)`
    color: ${colors.white};
    font-size: 30px;
    margin-right: 8px;
    cursor: pointer;
`;

const ArrowUp = styled(IoIosArrowUp)`
    color: ${colors.white};
    font-size: 30px;
    margin-right: 8px;
    cursor: pointer;
`;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: ${props => props.display ? "" : "none"};
`;

const DropDown = styled.div`
    top: ${props => (props.top ? "72px" : "-58px")};
    right: 0;
    height: 109px;
    width: 130px;
    background-color: ${colors.black};
    position: fixed;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
    cursor: pointer;
    transition: top 150ms ease-in-out;
    z-index: -1;

    p{
        color: ${colors.white};
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;

        :hover{
            color: #b5b0b0;   
            transition-duration: 0.2s;
        }
    }

   .logout{
       :hover{
            color: #cc1f1f;
       }
   }
`;
