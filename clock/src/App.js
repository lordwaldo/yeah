
import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioRef = useRef(null);

  const formatTime = (seconds) =>{
    const mins = Math.floor(seconds/60).toString().padStart(2,'0');
    const secs = (seconds % 60).toString().padStart(2,'0');
    return `${mins}:${secs}`;
  }

  const changeLength = (type,delta) =>{
    if (isRunning) return;

    if(type === 'break'){
      const newLength = Math.min(Math.mix(breakLength+delta,1),60);
      setBreakLength(newLength);
    }
    else{
      const newLength = Math.min(Math.min(sessionLength+delta,1),60);
      setSessionLength(newLength);
      if(!isRunning) setTimeLeft(newLength*60);
    }
  };
  const reset = () =>{
    setBreakLength(5);
    sessionLength(25);
    setTimeLeft(25*60);
    setIsRunning(false);
    setIsSession(true);
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play beep sound
      if (audioRef.current) {
        audioRef.current.play();
      }
      // Switch between session/break
      setIsSession(!isSession);
      setTimeLeft((isSession ? breakLength : sessionLength) * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);
  
  return(
    <div className='App'>
      <h1>25+5 clock</h1>
      <div className='controls'>
        <div>
          <h3 id='break-label'>break length</h3>
          <button
          id='break-decrement'
          onClick={()=> changeLength('break',-1)}
          disabled={isRunning || breakLength <= 1}>-</button>
          <span id="break-length">{breakLength}</span>
          <button
          id="break-increment"
          onClick={()=> changeLength('break',1)}
          disabled={isRunning || breakLength >=60}>+</button>
        </div>
        <div>
          <h3 id='session-label'>session length</h3>
          <button
          id='session-decrement'
          onClick={()=> changeLength('break',-1)}
          disabled={isRunning || sessionLength <= 1}>-</button>
          <span id='session-length'>{sessionLength}</span>
          <button
          id='session-increment'
          onClick={()=> changeLength('break',1)}
          disabled={isRunning || sessionLength >= 60}>+</button>
        </div>
      </div>
      <div className='timer'>
        <h2 id='timer-label'>{isSession? 'Session':'Break'}</h2>
      <div id='time-left'>{formatTime(timeLeft)}</div>
      </div>
      <div className="timer-controls">
        <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>

    </div>


  )
}

export default App;
