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
  const currentYear = new Date().getFullYear();
  const authorName = "Ayman EL KARROUSSI";

  return (
    <p>
      © {currentYear} - {authorName}, Tous droits réservés
    </p>
  );
}

function Header() {
  return (
    <header>
      <img
        src="https://emsi.ma/wp-content/uploads/2020/07/logo.png"
        alt="Logo Emsi"
        style={{ width: "100%", maxWidth: "300px", height: "auto" }}
      />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

function RandomItem({ item }) {
  if (!item) return <p>Chargement...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "16px" }}>
      <h2>
        Étudiant: {item.student.firstname} {item.student.lastname} (ID:{" "}
        {item.student.id})
      </h2>
      <h3>{item.course}</h3>

      <p>Date: {item.date}</p>
      <p>Note: {item.grade}</p>
    </div>
  );
}

function Menu() {
  const handleClick = (text) => {
    alert(`Vous avez cliqué sur : ${text}`);
  };

  return (
    <nav style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {["Notes", "Etudiants", "Matières", "A propos"].map((item) => (
          <li key={item} style={{ margin: "10px 0" }}>
            <button
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) =>
        console.error("Erreur lors du chargement des données:", error)
      );
  }, []);

  const pickRandomItem = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomItem(data[randomIndex]);
    }
  };

  return (
    <>
      <Menu />
      <Header />
      <MainContent />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ayman EL KARROUSSI Using Vite + React</h1>
      <div className="card">
        <button onClick={pickRandomItem}>Afficher un élément aléatoire</button>
      </div>
      <RandomItem item={randomItem} />
      <Footer />
    </>
  );
}

export default App;
