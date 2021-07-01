import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from 'react-radio-group';
import rglAPIController from "../../services/api.services";

export default function TableFrontend({ pageData }) {
    const [allStates, setAllStates] = useState("");

    useEffect(() => {
      getPreviousRenderedData();
    }, []);
  
  async function getPreviousRenderedData (){
    const response = await rglAPIController.getAll();
    let page = response.data[0].data;
    
    let orderByAscX = _.orderBy(JSON.parse(page).items,["y", "x"], ["asc", "asc"] );
    
    var Gresult = _(orderByAscX)
                    .groupBy((x) => x.y)
                    .map((value, key) => ({ column: key, rows: value.map((e) => e.type) }))
                    .value();
           
     console.log("group res", Gresult);


    setAllStates(JSON.parse(page))

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
    // console.log(e)
  }

  const students = [
    { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
    { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
    { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
    { id: 4, name: "Asad", age: 25, email: "asad@email.com" },
  ];

  function renderTableData() {
    return students.map((student, index) => {
      const { id, name, age, email } = student; //destructuring
      return (
        <tr key={id}>
         
          <td className="border border-green-600 p-5">{inp()}</td>
          <td className="border border-green-600 p-5">{op()}</td>
          <td className="border border-green-600 p-5">{radioGroup()}</td>
          <td className="border border-green-600 p-5">{calender()}</td>
          <td className="border border-green-600 p-5">---</td>
        </tr>
      );
    });
  }

  return (
    <>
      {/* <div className="grid grid-cols-12 p-10 gap-4"> */}

      {/* <div className="col-span-4 grid  grid-cols-1 gap-6  px-5 py-5">
      
        <div className="col-span-1 py-5 bg-gray-50 shadow-md border-black border rounded p-10">
         

          <div className="grid grid-cols-5 py-4">
            <div className="col-start-3">
              <img
                className="h-24 w-24 object-fill pt-1 rounded-full object-center "
                src={userInfo.image}
                alt={userInfo.name}
              />
            </div>
          </div>
          <div className="col-span-6 pt-2 text-center">
            <h4 className=" ">{userInfo.name}</h4>
            <p className="text-center pt-2">{userInfo.mail}</p>
          </div>

         
        </div>
      </div> */}
      {/* </div> */}

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
    </>
  );
}
