'use client'
import { useState, useEffect, useRef, ButtonHTMLAttributes } from 'react';
import { colorCalc, wishCalc, Preset, DispatchActions, relu, generalizeProbability } from '../(utils)';

const Result = (props: {state: Preset, dispatch: React.Dispatch<DispatchActions>}) => {
  const advancedSettingsButton = useRef<HTMLButtonElement>(null)
  
  if (props.state) {
    const fates = props.state.fates
    const primos = props.state.primos
    const starglitter = props.state.starglitter
    const pity = props.state.starglitter
    const isGuaranteed = props.state.isGuaranteed
    const useAdvancedSettings = props.state.useAdvancedSettings
    const advancedSettings = props.state.advancedSettings
    
    const wishes = fates + Math.floor(primos/160) + Math.floor(starglitter/5)

  const calculate = (wishes:number, pity:number, isGuaranteed:boolean, amountOfCharactersDesired:number) => {
    let probabilities:number[] = []
    const BASE_PROBABILITY = 1 - 0.006
    const CHARACTER_PITY = 90
    const CHARACTER_SOFT_PITY = 75
    const WEAPON_PITY = 80
    const WEAPON_SOFT_PITY = 65
    let private_guaranteed = isGuaranteed
    let private_wishes = wishes
    let soft_pity_modifier = 0

    for (let i = 0; i < amountOfCharactersDesired; i++) {
      const FIRST_RUN = i === 0
      if (FIRST_RUN) {
        if (private_guaranteed) {
          if ((private_wishes + pity) >= 90) {
            probabilities.push(1)
          }
          else {
            if (private_wishes >= 75 && private_wishes < 90) {
              soft_pity_modifier = 0.041*(private_wishes - 75)
            }
            probabilities.push((1 - (BASE_PROBABILITY**private_wishes)) + soft_pity_modifier)
            soft_pity_modifier = 0
          }
        }

        else if (!private_guaranteed) {
          if ((private_wishes + pity) >= 180) {
            probabilities.push(1)
          }
          else if ((private_wishes + pity) >= 90) {
            probabilities.push((1 - (BASE_PROBABILITY**(private_wishes - 90)) + .5))
          }
          else {
            probabilities.push((1 - (BASE_PROBABILITY**private_wishes)))
          }
        }
      }

      else if (!FIRST_RUN) {
        if (probabilities[i-1] === 1) {
          if (private_guaranteed) {
            private_wishes -= 77
            private_guaranteed = false
          }
          else if (!private_guaranteed) {
            private_wishes -= 154
          }
        }
      else {
        private_wishes = relu(private_wishes - Math.log(1 - probabilities[0]) / Math.log(BASE_PROBABILITY)) // Calculate the amount of wishes from the last character
        // TODO: Add a multiplier - currently directly subtracting the amount of wishes from the last character
        // console.log(private_wishes)
      }
          if ((private_wishes-(26*i)) >= 180) {
            probabilities.push(1)
          }
          else if ((private_wishes) >= 90) {
            probabilities.push(Math.min((1 - (BASE_PROBABILITY**(private_wishes - 90)) + .5), 99.99))
          }
          else {
            if (private_wishes >= 75 && private_wishes < 90) {
              soft_pity_modifier = 0.041*(private_wishes - 75)
            }
            probabilities.push(Math.min(((1 - (BASE_PROBABILITY**private_wishes)) + soft_pity_modifier), 99.99))
            soft_pity_modifier = 0
        }
      }
      console.log(private_wishes)
    }
    // console.log(
    //   Math.log(1 - probabilities[0]) / Math.log(BASE_PROBABILITY)
    // )
    return probabilities
  }
  const probabilities = calculate(wishes, pity, isGuaranteed, advancedSettings.amountOfCharactersDesired)
  
  const openAdvancedSettings = (e:React.MouseEvent<HTMLButtonElement>) => {
    props.dispatch({type: "updateUseAdvancedSettings", payload: !useAdvancedSettings})
    e.currentTarget.classList.toggle('active')
    e.currentTarget.blur()
  }
  
  useEffect(() => {
    if (props.state.useAdvancedSettings) {
      advancedSettingsButton.current!.classList.add('active')
    }
  }, [probabilities])
  
  return (
    <div className='container scara-bg'>
      <p className="wishes" style={ {color: colorCalc(wishes)} }>{wishes}</p>
      <p>Guaranteed <span style={ {color: "#eaad00"} }>5★</span>: {wishCalc("guaranteed 5*", wishes)}</p>

      {
        (wishCalc("guaranteed 5*", wishes) !== wishCalc("average 5*", wishes)) ?
          <p>Average<span style={ {color: "#eaad00"} }> 5★</span>: {wishCalc("average 5*", wishes)}</p> 
        : null
      }

      <p>Guaranteed <span style={ {color: "#b880dd"} }>4★</span>: {wishCalc("guaranteed 4*", wishes)}</p>
      <p>Average <span style={ {color: "#b880dd"} }>4★</span>: {wishCalc("average 4*", wishes)}</p>

      {
        useAdvancedSettings ? 
        <div className='advanced-results'>
          <p onClick={() => {console.log(probabilities)}}>Wishes in x days:</p>
          <p>Guaranteed <span style={ {color: "#eaad00"} }>5★</span> in x days:</p>
          <p>Average <span style={ {color: "#eaad00"} }>5★</span> in x days:</p>
          <p>Guaranteed <span style={ {color: "#b880dd"} }>4★</span> in x days:</p>
          <p>Average <span style={ {color: "#b880dd"} }>4★</span> in x days:</p>
          {probabilities.map((probability, index) => {
            return <p key={index}>
              Chance of banner character {index+1}: 
              <span style={ {color: generalizeProbability(probability).color} }> {generalizeProbability(probability).probability} </span>
              </p>
          })
          }
        </div> 
        : null
      }
      <button ref={advancedSettingsButton} onClick={openAdvancedSettings}>Advanced Planning</button>
    </div>
  );}
  else {
    return <div>Loading...</div>
  }
};

export default Result