import React from "react";
import Character from "../Character/Character";
import GameChat from "../GameChat/GameChat";
import CharacterStatus from "../Career/CharacterStatus/CharacterStatus";

const Home = () => {
  return (
    <>
      <CharacterStatus/>
      <Character />
      <GameChat />
    </>
  );
};

export default Home;
