'use client'
import React, { useState, useEffect, useReducer } from "react"
import { verifyInputIsNumber, handleKeyboardEvent } from "../(utils)"
import { Preset, AdvancedSettings, DispatchActions, preventZeroStart } from "../(utils)"


const Input = (props: {state: Preset, dispatch: React.Dispatch<DispatchActions>}) => {
const [firstRun, setFirstRun] = useState(true)
const [currentPreset, setCurrentPreset] = useState(
  typeof window !== 'undefined' && localStorage.getItem('currentPreset') ? localStorage.getItem('currentPreset')! : "preset1"
)

  useEffect(() => {
    if (firstRun === false) {
      localStorage.setItem('fates', props.state.fates.toString())
      localStorage.setItem('primos', props.state.primos.toString())
      localStorage.setItem('starglitter', props.state.starglitter.toString())
      localStorage.setItem('pity', props.state.pity.toString())
      localStorage.setItem('isGuaranteed', props.state.isGuaranteed.toString())


    
    }
  }, [
    props.state.fates,
    props.state.primos,
    props.state.starglitter,
    props.state.pity,
    props.state.isGuaranteed,
  ])

  return (
    <div className="container fischl-bg">
      <div className="input-wrapper">
        <label htmlFor="fates">Fates</label>
        <img src="Intertwined Fate.webp" alt="Intertwined Fate" />
        <input autoFocus onChange={(e)=>{
          props.dispatch({
            type: "updateFates", payload: parseInt(e.target.value) ? parseInt(e.target.value) : 0
          });
          preventZeroStart(e);
        }} onKeyDown={verifyInputIsNumber}
        value={props.state.fates}
          className="textbox" id="fates" type="text" inputMode="numeric"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="primos">Primos</label>
        <img src="Primogem.webp" alt="Primogem" />
        <input onChange={(e)=>{
          props.dispatch({
            type: "updatePrimos", payload: parseInt(e.target.value) ? parseInt(e.target.value) : 0
          });
        }} onKeyDown={verifyInputIsNumber}
        value={props.state.primos}
          className="textbox" id="primos" type="text" inputMode="numeric"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="starglitter">Starglitter</label>
        <img src="Starglitter.webp" alt="Starglitter" />
        <input onChange={(e)=>{
          props.dispatch({
            type: "updateStarglitter", payload: parseInt(e.target.value) ? parseInt(e.target.value) : 0
          });
        }} onKeyDown={verifyInputIsNumber}
        value={props.state.starglitter}
          className="textbox" id="starglitter" type="text" inputMode="numeric"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="pity">Pity</label>
        <input onChange={(e)=>{
          props.dispatch({
            type: "updatePity", payload: parseInt(e.target.value) ? parseInt(e.target.value) : 0
          });
        }} onKeyDown={verifyInputIsNumber}
        value={props.state.pity}
          className="textbox" id="pity" type="text" inputMode="numeric"
        />
      </div>

      <div className="radio-container">
        <input type="radio" name="guaranteed" id="true" className="button-radio" checked={props.state.isGuaranteed === true} />
          <label onClick={() => {
          props.dispatch({
            type: "updateIsGuaranteed", payload: true
          });
        }} onKeyDown={handleKeyboardEvent}
            htmlFor="true" tabIndex={0} role="radio" aria-checked={props.state.isGuaranteed}>Guaranteed
          </label>
        <input type="radio" name="guaranteed" id="false" className="button-radio" checked={props.state.isGuaranteed === false} />
          <label onClick={() => {
          props.dispatch({
            type: "updateIsGuaranteed", payload: false
          });
        }} onKeyDown={handleKeyboardEvent}
            htmlFor="false" tabIndex={0} role="radio" aria-checked={!props.state.isGuaranteed}>Not Guaranteed
          </label>
      </div>
    </div>
  )
}

export default Input