import React, { useContext, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";
import "./index.css";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const Header = ({ toggleTheme, currentTheme }) => {
  const { setMonth, currentMonth } = useContext(GlobalContext);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const headerRef = useRef(null);

  const handleMonthClick = (month) => {
    setMonth(month);
    setSelectedMonth(month);
  };

  useEffect(() => {
    const scrollHeaderToCurrentMonth = () => {
      const headerElement = headerRef.current;
      const selectedMonthElement = headerElement.querySelector(".bold");
      if (selectedMonthElement) {
        const scrollLeft =
          selectedMonthElement.offsetLeft -
          headerElement.offsetWidth / 2 +
          selectedMonthElement.offsetWidth / 2;
        headerElement.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    };
    scrollHeaderToCurrentMonth();
  }, [selectedMonth]);

  return (
    <header>
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-row overflow-auto header" ref={headerRef}>
            {months.map((month, index) => (
              <div
                className={`px-3 ${selectedMonth === month ? "bold" : "date"}`}
                key={index}
                onClick={() => handleMonthClick(month)}
              >
                {month}
              </div>
            ))}
          </Col>
          <Col xs="auto" className="theme-toggle">
            <Button 
              variant="link" 
              onClick={toggleTheme} 
              className="theme-button"
            >
              {currentTheme === "light" ? "🌙" : "☀️"}
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
