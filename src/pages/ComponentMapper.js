
import { checkbox, dateTimePicker, dropDown, input, radioButton } from './components';
import Item1 from './Item1';
import Item2 from './Item2';



const DesignerComponent = {
item1: Item1,
item2: Item2,
item_checkbox : checkbox,
item_input : input,
item_RadioButton : radioButton ,
item_DropDown : dropDown,
item_Date : dateTimePicker,



};


export default function ComponentMapper({ rows }) {
console.log('Rows: ',rows.length)
   
    const Component = DesignerComponent[rows];
   //  console.log("🚀 ~ ComponentMapper ~ Component", Component)
   //  const Component = DesignerComponent['item_input']
    return (
       <>
   {/*    pageData.type==='item1' ?  <Component pageData={pageData}/> :  <Component/> */}
       <Component />
      {/* <div>hello</div> */}
      </>
    );
  }