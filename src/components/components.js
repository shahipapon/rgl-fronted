import { Radio, RadioGroup } from 'react-radio-group';

function getCheckBoxValue(){
   
    var markedCheckbox = document.getElementsByName('cbox');  
    let values = ''
    for (var checkbox of markedCheckbox) {  
      if (checkbox.checked)  {
        values+= `${checkbox.value}, `
      }
      
    }   
    console.log('checkbox value:',values)
}

function handleChange(e) {
  console.log(e?.target?.value ? e.target.value : e);
}

function controll(property) {
  return `${property?.textColor === "red" ? "text-red-600" : ""} ${
    property?.textColor === "green" ? "text-green-600" : ""
  } ${property?.textColor === "blue" ? "text-blue-600" : ""}
  ${property?.fontStyle === "bold" ? "font-bold" : ""} ${
    property?.fontStyle === "italic" ? "italic" : ""
  } ${property?.fontStyle === "boldItalic" ? "italic font-bold" : ""}  abc `;
}



function input({controllProperty}) {
  return (
    <input
      type="text"
      placeholder="enter your text"
      className={
        `border-2 border-black w-36  focus:outline-none 
         ${controllProperty.borderStyle=== 'solid' && 'border-solid	'  }	
         ${controllProperty.borderStyle=== 'dashed' && "border-dashed"  }	
         ${controllProperty.borderStyle=== 'dotted' && "border-dotted"  }	
       `}
      onChange={handleChange}
    />
  );
}

function dropDown({controllProperty}) {
  return (
    <div className={controll(controllProperty)}>

    <select onChange={handleChange}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
      <option value="Option 4">Option 4</option>
    </select>
    </div>
  );
}

function checkbox({controllProperty}) {
  return (
    <div  className={controll(controllProperty)}>
    <input type="checkbox" name="cbox" value="Checkbox 1" onChange={getCheckBoxValue}/>
      <label for="cbox1"> Checkbox 1 </label>
      <input type="checkbox" name="cbox" value="Checkbox 2" onChange={getCheckBoxValue}/>
      <label for="cbox2"> Checkbox 2 </label>
      <input type="checkbox" name="cbox" value="Checkbox 3" onChange={getCheckBoxValue} />
      <label for="cbox3"> Checkbox 3 </label>
    </div>
     
  );
}
function radioButton({ controllProperty }) {
  return (
    <div className={controll(controllProperty)}>
      <RadioGroup name="settings" onChange={handleChange}>
        <Radio value="Settings 1" />
        Settings 1
        <Radio value="Settings 2" />
        Settings 2
        <Radio value="Settings 3" />
        Settings 3
      </RadioGroup>
    </div>
  );
}
function dateTimePicker({controllProperty}) {
  return (
    <input type="date" id="" name="" onChange={handleChange} className="border-2 border-gray-500"/>
  )
}

export { input, dropDown, checkbox, radioButton, dateTimePicker };


