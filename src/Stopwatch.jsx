import React, { useEffect, useState, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isRunning]);

  function startStop() {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
  }

  function formatTime() {
   
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60); 

   
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <div className='stopwatch'>
      <div className="display">
      <h1>Stopwatch</h1>
      <p>Time: {formatTime()}</p>
      </div>
      <div className="buttonContainer">
      <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
