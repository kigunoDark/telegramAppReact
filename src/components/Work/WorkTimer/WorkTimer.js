import React, { useState, useEffect } from "react";
import "./styles.css"; // Импорт CSS-файла

const WorkTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const handleUserAction = () => {
      if (isActive) {
        setIsActive(false);
        setHasLost(true);
      }
    };

    // Добавляем слушатели событий
    window.addEventListener('click', handleUserAction);
    window.addEventListener('keydown', handleUserAction);

    return () => {
      // Удаляем слушатели событий при размонтировании компонента
      window.removeEventListener('click', handleUserAction);
      window.removeEventListener('keydown', handleUserAction);
    };
  }, [isActive]);

  useEffect(() => {
    let interval = null;
    if (isActive && isConfirmed) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setSeconds(59);
          setMinutes((prev) => prev - 1);
        } else if (hours > 0) {
          setMinutes(59);
          setSeconds(59);
          setHours((prev) => prev - 1);
        } else {
          clearInterval(interval);
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive) {
      setIsWorking(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  const startTimer = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsWorking(true);
    setIsActive(true);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="timer-container">
      {isWorking && (
        <div className="circle">
          <div className="timer-display">
            <h1>{`${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}:${String(seconds).padStart(2, "0")}`}</h1>
          </div>
        </div>
      )}
      {!isWorking && (
        <div className="timer-menu">
          <div className="input-controls">
            <label>
              Часы:
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                min="0"
                disabled={isActive}
              />
            </label>
            <label>
              Минуты:
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                min="0"
                max="59"
                disabled={isActive}
              />
            </label>
          </div>
          <div className="controls">
            <button
              onClick={startTimer}
              disabled={isActive}
              className="btn start"
            >
              Работать
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Начать Работу</h2>
            <p>
              Вы уверены? После подтверждения отмена невозможна, и если вы
              возьмете телефон, вы проиграете и потеряете деньги.
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirm} className="btn confirm">
                Принять
              </button>
              <button onClick={handleCancel} className="btn cancel">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkTimer;
