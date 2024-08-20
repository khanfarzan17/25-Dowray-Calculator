import React, { useState } from "react";
import "../styles/Calculator.css";

import Heading from "./Heading";

const DowryCalculator = () => {
  const [groomAge, setgroomAge] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [familyWealth, setFamilyWealth] = useState("");
  const [groomCategory, setGroomCategory] = useState("");
  const [dowry, setDowry] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [name, setName] = useState("");

  const calculateDowry = () => {
    if (
      groomAge <= 0 ||
      familyWealth < 0 ||
      !educationLevel ||
      !groomCategory
    ) {
      return;
    }

    const baseAmount = 100000;
    const ageFactor = groomAge * 100;
    const educationFactor = educationLevel === "Graduate" ? 20000 : 10000;
    const wealthFactor = familyWealth * 0.1;

    let groomCategoryFactor = 0;
    switch (groomCategory) {
      case "Doctor":
        groomCategoryFactor = 50000;
        break;
      case "Engineer":
        groomCategoryFactor = 40000;
        break;
      case "Businessman":
        groomCategoryFactor = 30000;
        break;
      case "Government Job":
        groomCategoryFactor = 250000;
        break;
      default:
        groomCategoryFactor = 0;
    }

    const totalDowry =
      baseAmount +
      ageFactor +
      educationFactor +
      wealthFactor +
      groomCategoryFactor;

    setDowry(totalDowry);
    setIsReset(false);
  };

  const reset = () => {
    setName("");
    setgroomAge(0);
    setEducationLevel("");
    setDowry(null);
    setFamilyWealth(0);
    setGroomCategory("");
    setIsReset(true);
  };

  return (
    <section className="container">
      <Heading />

      <form>
        <div className="form-group">
          <label htmlFor="groomName">Groom's Name:</label>
          <input
            id="groomName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="groomAge">Groom's Age:</label>
          <input
            id="groomAge"
            type="number"
            value={groomAge}
            onChange={(e) => setgroomAge(parseInt(e.target.value))}
            className="input-field"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="educationLevel">Education Level:</label>
          <select
            id="educationLevel"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="drop-down"
          >
            <option value="">Select</option>
            <option value="HighSchool">High School</option>
            <option value="Graduate">Graduate</option>
            <option value="PostGraduate">Post Graduate</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="familyWealth">Family Wealth (₹):</label>
          <input
            id="familyWealth"
            type="number"
            value={familyWealth}
            onChange={(e) => setFamilyWealth(parseFloat(e.target.value))}
            className="input-field"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="groomCategory">Groom's Category:</label>
          <select
            id="groomCategory"
            value={groomCategory}
            onChange={(e) => setGroomCategory(e.target.value)}
            className="drop-down"
          >
            <option value="">Select</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Businessman">Businessman</option>
            <option value="Government Job">Government Job</option>
          </select>
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={calculateDowry}
            className="calculate-button"
          >
            Calculate
          </button>
          <button type="button" onClick={reset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {dowry !== null && !isReset && (
        <section className="result">
          <h2>
            Congratulations! <br />
            <span>Estimated Dowry: ₹{dowry}</span>
          </h2>
        </section>
      )}
    </section>
  );
};

export default DowryCalculator;
