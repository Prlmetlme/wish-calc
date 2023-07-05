'use client'
import { useState, useEffect, useReducer } from 'react'
import Input from "./input"
import Result from './result'
import Advanced from './advanced'
import { Preset, AdvancedSettings, DispatchActions } from "../(utils)"


const Form = () => {
  const [firstRun, setFirstRun] = useState(true)
  const [currentPreset, setCurrentPreset] = useState(
    typeof window !== 'undefined' && localStorage.getItem('currentPreset') ? localStorage.getItem('currentPreset')! : "preset1"
    // "preset1"
  )

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const reducer = (state: Preset, action: DispatchActions) => {
    switch (action.type) {
      case 'updateFates':
        return {...state, fates: action.payload as number}
      case 'updatePrimos':
        return {...state, primos: action.payload as number}
      case 'updateStarglitter':
        return {...state, starglitter: action.payload as number}
      case 'updatePity':
        return {...state, pity: action.payload as number}
      case 'updateIsGuaranteed':
        return {...state, isGuaranteed: action.payload as boolean}
      case 'updateUseAdvancedSettings':
        return {...state, useAdvancedSettings: action.payload as boolean}
      case 'updateAdvancedSettings':
        return {...state, advancedSettings: action.payload as AdvancedSettings}
      case 'updateAll':
        return action.payload as Preset
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    "fates": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).fates : 0,
    "primos": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).primos : 0,
    "starglitter": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).starglitter : 0,
    "pity": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).pity : 0,
    "isGuaranteed": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).isGuaranteed : false,
    "useAdvancedSettings": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).useAdvancedSettings : false,
    "advancedSettings": {
      "amountOfCharactersDesired": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).advancedSettings.amountOfCharactersDesired : 1,
      "daysPlanned": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).advancedSettings.daysPlanned : 0,
      "welkinDays": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).advancedSettings.welkinDays : 0,
      "characterPlanning": typeof window !== 'undefined' && localStorage.getItem(currentPreset) ? JSON.parse(localStorage.getItem(currentPreset)!).advancedSettings.characterPlanning : true
    }
  })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    localStorage.setItem(currentPreset, JSON.stringify(state))
    localStorage.setItem('currentPreset', currentPreset)
  }, [state])

  useEffect(() => {
    if (firstRun === false) {
      dispatch({type: 'updateAll', payload: JSON.parse(localStorage.getItem(currentPreset)!)? JSON.parse(localStorage.getItem(currentPreset)!) :
      {
        "fates": 0,
        "primos": 0,
        "starglitter": 0,
        "pity": 0,
        "isGuaranteed": false,
        "useAdvancedSettings": false,
        "advancedSettings": {
          "daysPlanned": 0,
          "welkinDays": 0,
          "characterPlanning": true
        }
      }

      })
      console.log(state)
    } else {
      setFirstRun(false)
    }
  }, [currentPreset])

  return (
  <>
    <Input state={state} dispatch={dispatch} />
    {state.useAdvancedSettings ? <Advanced state={state} dispatch={dispatch} setCurrentPreset={setCurrentPreset} currentPreset={currentPreset}/> : null}
    {/* Pulling advanced may cause issues, not sure yet. */}
    <Result state={state} dispatch={dispatch} />
  </>
  )
}

export default Form