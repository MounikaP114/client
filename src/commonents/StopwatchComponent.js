import React, { useEffect, useState } from 'react'
import axios from 'axios'

function StopwatchComponent() {
  const [time,  setTime]=useState(0)
  const [laps,  setLaps]=useState([])
  const [running, setRunning]=useState(false)

  useEffect(()=>{
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[running])

  const handleLaps=()=>{
    setLaps([...laps, time])
  }
  const handleReset=()=>{
    setTime(0)
    setLaps([])
  }
  const handleSave=async () => {
    try {
      await axios.post('/api/stopwatch', { time, laps });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
    <center style={{marginTop:'260px'}}>
    <div>
        <spamn>{("0"+Math.floor((time/(3600000))%24)).slice(-2)}:</spamn>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <button onClick={() => setRunning(!running)}> {running ? 'Stop' : 'Start'}</button>

      <button onClick={handleLaps}>Leap</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSave}>Save</button>

      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}.
            {("0" + ((lap / 10) % 100)).slice(-2)}
          </li>
        ))}
      </ul>
    </center>
       
    </>
  )
}

export default StopwatchComponent