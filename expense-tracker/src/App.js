import React, { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Balance } from "./components/Balance/Balance";
import { Transactions } from "./components/Transactions/Transactions";
import { GlobalProvider } from "./context/GlobalState";
import { Container } from "react-bootstrap";
import "./bootstrap-override.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <GlobalProvider>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <Container className="px-3">
        <Balance />
        <Transactions />
      </Container>
    </GlobalProvider>
  );
}

export default App;
