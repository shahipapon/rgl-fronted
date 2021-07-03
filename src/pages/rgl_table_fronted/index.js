import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from 'react-radio-group';
import rglAPIController from "../../services/api.services";
import ComponentMapper from "../ComponentMapper";


export default function TableFrontend() {
    const [rglConfig, setRglConfig] = useState([]);
    const [maxRows, setMaxRows] = useState(0);

  useEffect(() => {
    getDesignedLayout();
  }, []);

  async function getDesignedLayout() {
    const response = await rglAPIController.getTableConfig();
    let page = response.data[0].config;
    page = JSON.parse(page);
    
    let orderByAscX = _.orderBy(page.items,["y", "x"], ["asc", "asc"] );
    
    var groupYwithX = _(orderByAscX)
                    .groupBy((x) => x.y)
                    .map((value, key) => ({ column: key, rows: value.map((e) => e.type) }))
                    .value();
    
     const maxRows = Math.max(...groupYwithX.map(({rows})=>rows.length))
     console.log("🚀 ~ file: index.js ~ line 29 ~ getDesignedLayout ~ maxRows", maxRows)
     setMaxRows(maxRows);



    setRglConfig(groupYwithX);
  }
  

  function  op(){
      return (
        <select onChange={handleChange}>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
        <option value="Option 4">Option 4</option>
      </select>
      )
  } 

  function inp(){
      return (
        <input type="text" placeholder="enter your text" className="border-2 border-gray-500 w-36	" onChange={handleChange} />
      )
  }

  function radioGroup (){
      return (
        <RadioGroup name="settings" onChange={handleChange}>
        <Radio value="Settings 1" />
        Settings 1
        <Radio value="Settings 2" />
        Settings 2
        <Radio value="Settings 3" />
        Settings 3
      </RadioGroup>
      )
  }

  function calender(){
      return (
        <input type="date" id="" name="" onChange={handleChange} className="border-2 border-gray-500"/>
      )
  }


  function handleChange(e){
      console.log(e?.target?.value ? e.target.value : e )
    
  }

  const students = [
    { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
    { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
    { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
    { id: 4, name: "Asad", age: 25, email: "asad@email.com" },
  ];

function fillEmptyrows(fillTimes){
while(fillTimes--){
  console.log(fillTimes)
}

}
  function renderTableData() {
    return rglConfig.map((column, index) => {
     console.log("🚀 ~ file: index.js ~ line 92 ~ getDesignedLayout ~ maxRows", maxRows)
     console.log("🚀 ~ file: index.js ~ line 92 ~ getDesignedLayout ~ maxRows", maxRows)
     console.log("🚀 ~ file: index.js ~ line 92 ~ getDesignedLayout ~ maxRows", maxRows)
      // const { id, name, age, email } = 'student'; //destructuring
      const fillCount = maxRows - column.rows.length
      const fillArray  =new Array(fillCount).fill('---');


      return (
        
        <tr key={index}>
          {/* <td className="border border-green-600 p-5">{ComponentMapper('')}</td> */}
          {/* <td className="border border-green-600 p-5">{op()}</td>
          <td className="border border-green-600 p-5">{radioGroup()}</td>
          <td className="border border-green-600 p-5">{calender()}</td> */}

          {column.rows.map((row) => (
            <td className="border border-green-600 p-5">
              <ComponentMapper rows={row} />
            </td>
          ))}
         { fillEmptyrows(fillCount)}

         {fillArray.map((fill)=>(
          <td className="border border-green-600 p-5">
             ---
            </td>
          ))}


        

        
        </tr>
      );
    });
  }

  return (
    
      <div className="container mx-auto px-20">
        hello
        <table id="students" className="border-collapse border border-black-800 h-40 table-auto		">
          {/* <thead>
            <tr>
              <th className="border border-green-600 ...">State</th>
              <th className="border border-green-600 ...">City</th>
            </tr>
          </thead> */}
          <tbody>{renderTableData()}</tbody>
        </table>



        </div>
  );
}
