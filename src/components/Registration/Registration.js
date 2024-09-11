import React, { useState , useEffect} from "react";
import "./styles.css";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Введите имя";
    }
    
    if (!age || age < 7 || age > 100) {
      newErrors.age = "Возраст должен быть от 7 до 100 лет";
    }
    
    if (!sex) {
      newErrors.sex = "Выберите пол";
    }
    
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Name:", name);
      console.log("Age:", age);
      console.log("Sex:", sex);
    }
  };

  return (
    <div className="registration-container">
      <div className="logo">
        <h1>FocusMindSim</h1>
      </div>
      <h2>Новый Житель</h2>
      <form className="registration-form">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
          {errors.name && <p className="error-message">{errors.name}</p>}
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          min="7"
          max="100"
          required
        />
         {errors.age && <p className="error-message">{errors.age}</p>}
        <div className="sex-choice">
          <div className="sex-choice-row">
            <label htmlFor="male">M</label>
            <input
              type="radio"
              id="male"
              name="sex"
              onChange={(e) => setSex(e.target.value)}
              value="male"
              required
            />
          </div>
          <div className="sex-choice-row">
            <label htmlFor="female">Ж</label>
            <input
              type="radio"
              id="demale"
              onChange={(e) => setSex(e.target.value)}
              name="sex"
              value="male"
              required
            />
          </div>
        </div>
        {errors.sex && <p className="error-message">{errors.sex}</p>}

        <button type="submit" onClick={handleSubmit}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
