import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

import azulbranco from "../assets/azulbranco.png";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={azulbranco} alt="" />
      <h1>
        Bem vindo, <span>{userName}!</span>
      </h1>
      <h3>Selecione um bate-papo para começar a enviar mensagens.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
