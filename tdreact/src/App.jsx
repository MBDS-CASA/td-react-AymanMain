import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function MainContent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = currentDate.toLocaleDateString("fr-FR", options);
  const timeString = currentDate.toLocaleTimeString("fr-FR");

  return (
    <p>
      Bonjour, on est le {dateString} et il est {timeString}
    </p>
  );
}

function Footer() {
  return <p>Tous droits réservés - EL KARROUSSI Ayman</p>;
}
function Header() {
  return (
    <header>
      <img
        src="https://emsi.ma/wp-content/uploads/2020/07/logo.png"
        alt="Logo Emsi"
        style={{ width: "100%", maxWidth: "300px", height: "auto" }}
      ></img>
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <MainContent />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ayman EL KARROUSSI Using Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer />
    </>
  );
}

export default App;
