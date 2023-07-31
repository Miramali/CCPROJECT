import React, { useState } from 'react'
import './style.css'
import Mentor from '../../pages/menteeProfile/index';
import Mentee from '../../pages/mentorProfile/index';
import Logo from '../logo';

const Wizard = () => {
  const options = [
    {
      label: "mentor",
      value: "mentor",
    },
    {
      label: "mentee",
      value: "mentee",
    },
  ];
  const [choose, setChoose] = useState("")
  if (choose === "mentee") {
    return (
      <>
        <Logo />
        <Mentee options={options} choose={choose} setChoose={setChoose} />
      </>
    );

  } else {
    return (
      <>
        <Logo />
        <Mentor options={options} choose={choose} setChoose={setChoose} />
      </>
    );
  };
}

export default Wizard