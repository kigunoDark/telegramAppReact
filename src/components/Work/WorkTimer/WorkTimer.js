import React, { useState, useEffect } from "react";
import "./styles.css"; // Импорт CSS-файла

const WorkTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  useEffect(() => {
    const handleUserAction = () => {
      if (isWorking) {
        setIsActive(false);
        setHasLost(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isWorking) {
        setIsActive(false);
        setHasLost(true);
      }
    };

    window.addEventListener("click", handleUserAction);
    window.addEventListener("keydown", handleUserAction);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("click", handleUserAction);
      window.removeEventListener("keydown", handleUserAction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isWorking]);

  useEffect(() => {
    let interval = null;
    if (isActive && isConfirmed) {
      interval = setInterval(() => {
        setIsWorking(true);
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
    setIsActive(true);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleResetBtn = () => {
    setHasLost(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsWorking(false);
    setIsActive(false);
    setIsConfirmed(false);
  };

  return (
    <div className="timer-container">
      {isWorking && !hasLost && (
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
          {!hasLost && (
            <>
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
                  className="btn accept"
                >
                  Работать
                </button>
              </div>
            </>
          )}
          {hasLost && (
            <div className="lost-message">
              <h2>Опачки, телефон в руках!</h2>
              <p>
                Ну всё, теперь все твои усилия пошли прахом. Начальник тебя
                раскусил, деньги исчезли, а теперь только выходить и лицом в
                грязь!
              </p>

              <button
                onClick={handleResetBtn}
                disabled={isActive}
                className="btn accept"
              >
                Хорошо Брат
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ты уверен, что готов впрягаться?</h2>
            <p>
              После подтверждения всё, как у нас на районе: отмены не будет!
              Если телефон возьмёшь, начальник тебя спалит, а мы потом всё про
              тебя узнаем. Таймер пошёл – так что, убирай телефон, иначе только
              успеешь потерять деньги и репутацию!"
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
