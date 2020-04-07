import React, {Fragment, useState} from 'react';

const RawJsonInput = ({handleDataChange}) => {
  handleDataChange = handleDataChange || (() => {})

  const [jsonRawVal, setJsonRawVal] = useState("");
  const [isSyntaxValid, setIsSyntaxValid] = useState(true); // Needed for textare
  const [isJSONValid, setIsJSONValid] = useState(false); // Needed it for button

  const validateRawJson = (json) => {
    try {
      const obj = JSON.parse(json);
      setIsSyntaxValid(true);
      setIsJSONValid(true);
      handleDataChange(obj);
      return true;
    } catch (error) {
      setIsSyntaxValid(false);
      setIsJSONValid(false);
      return false;
    }
  }

  const beautifyRawJson = () => {
    if (isJSONValid) {
      const obj = JSON.parse(jsonRawVal);
      const beautified = JSON.stringify(obj, undefined, 2);
      setJsonRawVal(beautified);
    }
  }

  const handleOnChange = ($event) => {
    const inputVal = $event.target.value;
    validateRawJson(inputVal);
    setJsonRawVal(inputVal);
  }


  return (
    <Fragment>
      <div className="field">
        <div className="control">
          <textarea 
            className={`textarea is-primary ${!isSyntaxValid  ? 'is-danger' : ''}`} 
            placeholder="Enter RAW JSON here..." 
            spellCheck="false" 
            rows="10"
            value={jsonRawVal}
            onChange={handleOnChange}
            ></textarea>
        </div>
      </div>
      
      <div className="buttons">
        <button 
          className="button is-light"
          onClick={() => beautifyRawJson()}
          >Beautify</button>
        <button className={`button is-primary`} disabled={!isJSONValid}>Submit</button>
      </div>
    </Fragment>

  )
}

export default RawJsonInput;