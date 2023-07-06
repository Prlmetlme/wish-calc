'use client'
import { useState, useEffect, useReducer } from 'react'
import Input from "./input"
import Result from './result'
import Advanced from './advanced'
import { Preset, AdvancedSettings, DispatchActions } from "../(utils)"


const Form = () => {
  const [clientSide, setClientSide] = useState(false)
  const [currentPreset, setCurrentPreset] = useState(
    typeof window !== 'undefined' && localStorage.getItem('currentPreset') ? localStorage.getItem('currentPreset')! : "preset1"
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
    "fates": 0,
    "primos": 0,
    "starglitter": 0,
    "pity": 0,
    "isGuaranteed": false, 
    "useAdvancedSettings": false, 
    "advancedSettings": {            
      "amountOfCharactersDesired": 0,
      "daysPlanned": 0,
      "welkinDays": 0,
      "characterPlanning": true 
    }
  })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (clientSide === true) {
      localStorage.setItem(currentPreset, JSON.stringify(state))
      localStorage.setItem('currentPreset', currentPreset)
    }
  }, [state])

  useEffect(() => {
   
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
        }})
      setClientSide(true)

  }, [currentPreset])

  return (
  <>
    <Input state={state} dispatch={dispatch} />
    {state.useAdvancedSettings ? <Advanced state={state} dispatch={dispatch} setCurrentPreset={setCurrentPreset} currentPreset={currentPreset}/> : null}
    <Result state={state} dispatch={dispatch} />
  </>
  )
}

export default Form