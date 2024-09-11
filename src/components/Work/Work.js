import React from "react";
import Character from "../Character/Character";
import WorkTimer from "./WorkTimer/WorkTimer";
import CharacterStatus from "../Career/CharacterStatus/CharacterStatus";

const Work = ({}) => {
  return (
    <>
      <CharacterStatus />
      <Character />
      <WorkTimer />
    </>
  );
};

export default Work;
