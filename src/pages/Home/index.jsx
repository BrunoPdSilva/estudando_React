import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css";

import { Card } from "../../components/card/index";

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    axios.get("https://api.github.com/users/BrunoPdSilva").then(res => {
      setUser({ name: res.data.name, avatar: res.data.avatar_url });
    });
  }, []);

  return (
    <div className="container">
      <h1>Estou aprendendo React</h1> 
      <h3>Espero conseguir dominar esta tecnologia.</h3>

      <header>
        <h2>Lista de Presença</h2>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile Image" />
        </div>
      </header>

      <div className="form">
        <input
          type="text"
          id="message"
          placeholder="Digite seu nome"
          onChange={e => setStudentName(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleAddStudent}>
          Enviar
        </button>
      </div>

      {students.map(student => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}