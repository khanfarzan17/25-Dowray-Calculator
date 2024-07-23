import React, { useState } from "react";
import "../styles/Calculator.css";
import toast, { Toaster } from "react-hot-toast";
import Heading from "./Heading";

const DowryCalculator = () => {
  const [groomAge, setgroomAge] = useState(0);
  const [educationLevel, setEducationLevel] = useState("");
  const [familyWealth, setFamilyWealth] = useState(0);
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
      toast.error("Please fill out all fields correctly.");
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
      case "Goverment Job ":
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

    toast.success("Dowry Calculated Successfully");

    setDowry(totalDowry);
    setIsReset(false);
  };

  const reset = () => {
    setName("");
    setgroomAge("");
    setEducationLevel("");
    setDowry("");
    setFamilyWealth("");
    setGroomCategory("");
    setIsReset(true);
  };

  return (
    <div className="container">
      <Heading />
      <Toaster position="top-center" />
      <label className="label">
        Groom's Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </label>

      <label className="label">
        Groom's Age:
        <input
          type="number"
          value={groomAge}
          onChange={(e) => setgroomAge(parseInt(e.target.value))}
          className="input-field"
          min="0"
        />
      </label>
      <br />
      <label className="label">
        Education Level:
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          className="drop-down"
        >
          <option value="">Select</option>
          <option value="HighSchool">High School</option>
          <option value="Graduate">Graduate</option>
          <option value="PostGraduate">Post Graduate</option>
        </select>
      </label>
      <br />
      <label className="label">
        Family Wealth (₹):
        <input
          type="number"
          value={familyWealth}
          onChange={(e) => setFamilyWealth(parseFloat(e.target.value))}
          className="input-field"
          min="0"
        />
      </label>
      <br />
      <label className="label">
        Groom's Category:
        <select
          value={groomCategory}
          onChange={(e) => setGroomCategory(e.target.value)}
          className="drop-down"
        >
          <option value="">Select</option>
          <option value="Doctor">Doctor</option>
          <option value="Engineer">Engineer</option>
          <option value="Businessman">Businessman</option>
          <option value="Goverment Job ">Government Job</option>
        </select>
      </label>
      <br />
      <button onClick={calculateDowry} className="calculate-button">
        Calculate
      </button>
      {dowry !== null && !isReset && (
        <h2>
          {" "}
          Congratulation{" "}
          <span>
            <p>Estimated Dowry: ₹{dowry}</p>
          </span>
        </h2>
      )}
      <button onClick={reset} className="calculate-button">
        Reset
      </button>
    </div>
  );
};

export default DowryCalculator;
