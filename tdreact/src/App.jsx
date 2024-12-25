import { useState, useEffect } from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MainContent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
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
      Bonjour, on est le {dateString} et il est {timeString}.
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
  if (!item) return <p>Sélectionnez un élément au hasard...</p>;

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

function Menu({ onMenuChange }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleClick = (item) => {
    setActiveItem(item);
    onMenuChange(item);
  };

  return (
    <nav style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item} style={{ margin: "10px 0" }}>
            <button
              style={{
                backgroundColor: activeItem === item ? "#0056b3" : "#007BFF",
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

function Notes({ data }) {
  if (!data || data.length === 0) {
    return <p>Chargement des données ou aucune donnée disponible.</p>;
  }

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px auto", width: "80%" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom de l'étudiant</TableCell>
            <TableCell>Cours</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.unique_id}>
              <TableCell>{item.unique_id}</TableCell>
              <TableCell>
                {`${item.student.firstname} ${item.student.lastname}`}
              </TableCell>
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Etudiants() {
  return <h2>Composant Etudiants</h2>;
}

function Matieres() {
  return <h2>Composant Matières</h2>;
}

function APropos() {
  return <h2>Composant A Propos</h2>;
}

function App() {
  const [data, setData] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Notes");

  const renderContent = () => {
    switch (activeMenu) {
      case "Notes":
        return <Notes data={data} />;
      case "Etudiants":
        return <Etudiants />;
      case "Matières":
        return <Matieres />;
      case "A propos":
        return <APropos />;
      default:
        return null;
    }
  };

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
      <Menu onMenuChange={setActiveMenu} />
      <Header />
      <MainContent />
      <div>{renderContent()}</div>
      <button onClick={pickRandomItem} style={{ margin: "20px" }}>
        Sélectionner un élément au hasard
      </button>
      <RandomItem item={randomItem} />
      <Footer />
    </>
  );
}

export default App;
