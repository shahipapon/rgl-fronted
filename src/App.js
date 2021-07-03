import React from "react";
import 'react-grid-layout/css/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Item2 from './pages/Item1';
// import Item1 from './pages/Item2';
// import RglRender from './pages/RglRender';
// import Rgl from './pages/rgl_Dnd';
import TableDnd from './pages/rgl_Dnd_Table';
import TableFrontend from './pages/rgl_table_fronted';
import "./styles.css";

export default function app() {
return(
  <div>
  <Router>
      {/* <Navbar /> */}
      <Switch>
        {/* <Route path='/' exact component={Rgl} />
        <Route path='/designpage' component={Rgl} />
        <Route path='/renderpage' component={RglRender} /> */}
        <Route path='/' exact component={TableDnd} />
        <Route path='/tableDnd' component={TableDnd} />
        <Route path='/tableFrontend' component={TableFrontend} />
        {/* <Route path='/item1' component={Item1} />
        <Route path='/item2' component={Item2} /> */}
      
      
      </Switch>
    </Router>

  </div>
)
}
