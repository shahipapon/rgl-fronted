
import Item1 from './Item1';
import Item2 from './Item2';

const DesignerComponent = {
item1: Item1,
item2: Item2,
};


export default function ComponentMapper({ pageData }) {
    const Component = DesignerComponent[pageData.type];
    return (
     pageData.type==='item1' ?  <Component pageData={pageData}/> :  <Component/>
    );
  }