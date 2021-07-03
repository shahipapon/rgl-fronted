
import { checkbox, input } from './components';
import Item1 from './Item1';
import Item2 from './Item2';



const DesignerComponent = {
item1: Item1,
item2: Item2,
Checkbox : checkbox,
inp :input,
};


export default function ComponentMapper({ pageData }) {
    // const Component = DesignerComponent[pageData.type];
    const Component = DesignerComponent['Checkbox']
    return (
    //  pageData.type==='item1' ?  <Component pageData={pageData}/> :  <Component/>
       <Component/>
    );
  }