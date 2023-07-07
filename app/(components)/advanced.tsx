import { useState } from "react";
import {
  verifyInputIsNumber,
  handleKeyboardEvent,
  Preset,
  DispatchActions,
} from "../(utils)";

const Advanced = (props: {
  state: Preset;
  dispatch: React.Dispatch<DispatchActions>;
  setCurrentPreset: Function;
  currentPreset: string;
}) => {
  const [inputStates, setInputStates] = useState("");
  const [useAdvancedSettings, setUseAdvancedSettings] = useState(false);
  const [numberOfCharacters, setNumberOfCharacters] = useState(0);
  const [reuse, setReuse] = useState(false);

  const characterPlanning = props.state.advancedSettings.characterPlanning;
  const advancedSettings = props.state.advancedSettings;
  return (
    <>
      <div className="container madame-bg">
        <div className="input-wrapper">
          <label htmlFor="characters">Number of desired characters</label>
          <input
            onKeyDown={verifyInputIsNumber}
            id="characters"
            type="text"
            className="textbox"
            onChange={(e) => {
              props.dispatch({
                type: "updateAdvancedSettings",
                payload: {
                  ...advancedSettings,
                  amountOfCharactersDesired: e.target.value
                    ? parseInt(e.target.value)
                    : 0,
                },
              });
            }}
            value={advancedSettings.amountOfCharactersDesired}
            inputMode="numeric"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="days">Days planned in advance</label>
          <input
            onKeyDown={verifyInputIsNumber}
            id="days"
            type="text"
            className="textbox"
            onChange={(e) => {
              props.dispatch({
                type: "updateAdvancedSettings",
                payload: {
                  ...advancedSettings,
                  daysPlanned: e.target.value ? parseInt(e.target.value) : 0,
                },
              });
            }}
            value={advancedSettings.daysPlanned}
            inputMode="numeric"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="welkin">Days of Welkin</label>
          <input
            onKeyDown={verifyInputIsNumber}
            id="welkin"
            type="text"
            className="textbox"
            onChange={(e) => {
              props.dispatch({
                type: "updateAdvancedSettings",
                payload: {
                  ...advancedSettings,
                  welkinDays: e.target.value ? parseInt(e.target.value) : 0,
                },
              });
            }}
            value={advancedSettings.welkinDays}
          />
        </div>
        <div className="radio-container">
          <input
            type="radio"
            name="weapon"
            id="character-planning-true"
            className="button-radio"
            checked={characterPlanning === true}
          />
          <label
            onClick={() =>
              props.dispatch({
                type: "updateAdvancedSettings",
                payload: { ...advancedSettings, characterPlanning: true },
              })
            }
            onKeyDown={handleKeyboardEvent}
            htmlFor="character-planning-true"
            tabIndex={0}
            role="radio"
            aria-checked={characterPlanning}
          >
            Character
          </label>
          <input
            type="radio"
            name="weapon"
            id="character-planning-false"
            className="button-radio"
            checked={characterPlanning === false}
          />
          <label
            onClick={() =>
              props.dispatch({
                type: "updateAdvancedSettings",
                payload: { ...advancedSettings, characterPlanning: false },
              })
            }
            onKeyDown={handleKeyboardEvent}
            htmlFor="character-planning-false"
            tabIndex={0}
            role="radio"
            aria-checked={!characterPlanning}
          >
            Weapon
          </label>
        </div>

        <div className="radio-container">
          <input
            type="radio"
            name="preset"
            id="preset-1"
            className="button-radio"
            checked={props.currentPreset === "preset1"}
          />
          <label
            onClick={() => props.setCurrentPreset("preset1")}
            onKeyDown={handleKeyboardEvent}
            htmlFor="preset-1"
            tabIndex={0}
            role="radio"
            aria-checked={reuse}
          >
            Preset 1
          </label>

          <input
            type="radio"
            name="preset"
            id="preset-2"
            className="button-radio"
            checked={props.currentPreset === "preset2"}
          />
          <label
            onClick={() => props.setCurrentPreset("preset2")}
            onKeyDown={handleKeyboardEvent}
            htmlFor="preset-2"
            tabIndex={0}
            role="radio"
            aria-checked={reuse}
          >
            Preset 2
          </label>

          <input
            type="radio"
            name="preset"
            id="preset-3"
            className="button-radio"
            checked={props.currentPreset === "preset3"}
          />
          <label
            onClick={() => props.setCurrentPreset("preset3")}
            onKeyDown={handleKeyboardEvent}
            htmlFor="preset-3"
            tabIndex={0}
            role="radio"
            aria-checked={reuse}
          >
            Preset 3
          </label>
        </div>
      </div>
    </>
  );
};

export default Advanced;
