import React from "react";
import { Bars, Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/designPage" activeStyle>
            Design Page
          </NavLink>
          <NavLink to="/renderPage" activeStyle>
            Render Designed Page
          </NavLink>
          <NavLink to="/tableFrontend" activeStyle>
          TableFrontend
          </NavLink>
          <NavLink to="/tableDnd" activeStyle>
          TableDnd
          </NavLink>
		  {/* <NavLink to="/item1" activeStyle>
            item 1 page
          </NavLink>
		  <NavLink to="/item2" activeStyle>
            item 2 page
          </NavLink> */}

          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
