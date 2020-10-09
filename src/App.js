import React, { useState, useEffect } from 'react';
import { pads } from './audio'
import './App.css';

function App() {
   const [audio, setAudio] = useState('')
   const [power, setPower] = useState(false)

   const handleClick = (pad) => {
      if (!power) return
      setAudio(pad.audioName)
      pad.audio.play()
   }

   const turnOn = () => {
      power ? setAudio('') : setAudio('---')
      setPower(!power)
   }
   const playSound = (e) => {
      pads.forEach(pad => {
         if (!power) return
         if (e.key === pad.key.toLocaleLowerCase()) {
            pad.audio.play()
            setAudio(pad.audioName)
         }
      })
   }

   useEffect(() => {
      document.addEventListener('keydown', playSound)
      return function cleanup() {
         document.removeEventListener('keydown', playSound)
      }
   }, [power])

   return (
      <div id="drum-machine" className="App">
         <label htmlFor="power">
            <input type="checkbox" name="power" id="power" onChange={turnOn} checked={power} />
            <span><i className={`${power ? 'on ' : ''}fas fa-power-off`}></i></span>
         </label>
         <div id="display">{audio}</div>
         <div className="pads-container">
            {pads.map(pad => (
               <div key={pad.key} id={pad.audioName} className='drum-pad' onClick={() => handleClick(pad)}>
                  <audio src={pad.audio} id={pad.key} className="clip"></audio>
                  {pad.key}
               </div>
            ))}
         </div>
      </div>
   );
}

export default App;
