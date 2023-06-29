export const verifyInputIsNumber = (e:React.KeyboardEvent<HTMLInputElement>) => {
    const allowedExceptions = ["Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Delete", "Tab", "0"]
    const userInput = e.key
    if (Number(userInput) || allowedExceptions.includes(userInput)) {
    }
    else { 
      e.preventDefault() 
    }
}

export const preventZeroStart = (e:React.ChangeEvent<HTMLInputElement>) => {
  if (e.currentTarget.value[0] === "0") {
    e.currentTarget.value = `${parseInt(e.currentTarget.value)}`
  }
}

export const generalizeProbability = (probability:number): {"probability":string, "color":string, "estimate":string} => {
  const roundedProbability = Math.floor((probability * 100000)) /1000

  switch (true) {
    case (roundedProbability <= 20):
      return {"probability": "Very unlikely", "color": "#330000", "estimate": "less than 20%"}
    case (roundedProbability > 20 && roundedProbability <= 49.99):
      return {"probability": "Unlikely", "color": "#fb8383", "estimate": "between 20% and 50%"}
    case (roundedProbability === 50):
      return {"probability": "50/50", "color": "green", "estimate": "50%"}
    case (roundedProbability > 50 && roundedProbability <= 79.99):
      return {"probability": "Likely", "color": "green", "estimate": "between 50% and 80%"}
    case (roundedProbability >= 80 && roundedProbability < 100):
      return {"probability": "Very likely", "color": "#d6851e", "estimate": "above 80%, but less than 100%"}
    case (roundedProbability >= 100):
      return {"probability": "Guaranteed", "color": "#eaad00", "estimate": "100%"}
    default:
      break;
  }
  return {"probability": "Error", "color": "#330000", "estimate": "Error"}
}

export const relu = (x:number) => {
  if (x < 0) return 0
  else return x
}

export const wishCalc = (calculation:string, wishes:number) => {
  switch (calculation) {

    case "guaranteed 5*":
      return Math.floor(wishes/90)
    
    case "average 5*":
      return Math.floor(wishes/76)
    
    case "guaranteed 4*":
      return Math.floor(wishes/10)

    case "average 4*":
      return Math.floor(wishes/9)
  default:
      break;
  }
}

export const colorCalc = (wishes: number) => {
  let purpleWish = wishes
  let red = 255
  let green = 255
  let blue = 255

  // White to Purple
  if (wishes > 10) purpleWish = 10
  red = 255 - Math.floor(purpleWish * 11.19)
  green = 255 - Math.floor(purpleWish * 26.25)
  blue = 255 - Math.floor(purpleWish * 1.77)

  // Purple to Gold
  if (wishes > 10) {
    if (wishes > 90) wishes = 90
    red = red + wishes
    green = green + wishes * 2
    blue = blue - Math.floor(wishes * 2.975)
  }
  if (red <= 0) red = 0
  if (red >= 255) red = 255
  if (green <= 0) green = 0
  if (green >= 255) green = 255
  if (blue <= 0) blue = 0
  if (blue >= 255) blue = 255
  
  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')

  return `#${redHex}${greenHex}${blueHex}`
}
 

export const handleKeyboardEvent = (e:React.KeyboardEvent<HTMLLabelElement>) => {
  if (e.key === "Enter") {
    e.currentTarget.click()
  }
  // if (e.key === "ArrowRight" && e.currentTarget.id === "true") {
 const elements = Array.from(e.currentTarget.parentElement!.children).filter(element => {
    return element.nodeName === "LABEL"
 }) as HTMLLabelElement[]
 
 const currentElement = elements.findIndex(element => {
    return element.innerHTML === e.currentTarget.innerHTML
  })
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    if (e.key === "ArrowDown") e.preventDefault()
    if (currentElement === elements.length - 1) {
      elements[0].focus()
    }
    else {
      elements[currentElement + 1].focus()
    }
  }
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    if (e.key === "ArrowUp") e.preventDefault()
    if (currentElement === 0) {
      elements[elements.length - 1].focus()
    }
    else {
      elements[currentElement - 1].focus()
    }
  }
}


export interface Preset {
    fates: number,
    primos: number,
    starglitter: number,
    pity: number,
    isGuaranteed: boolean,
    useAdvancedSettings: boolean,
    advancedSettings: AdvancedSettings
}

export interface AdvancedSettings {
  amountOfCharactersDesired: number,
  daysPlanned: number,
  welkinDays: number,
  characterPlanning: boolean
}

export interface DispatchActions {
  type: "updateFates" | "updatePrimos" | "updateStarglitter" | "updatePity" | "updateIsGuaranteed" 
  | "updateUseAdvancedSettings" | "updateAdvancedSettings" | "updateDaysPlanned" | "updateWelkinDays" 
  | "updateCharacterPlanning" | "updateAll"
  payload: number | boolean | AdvancedSettings | Preset
}