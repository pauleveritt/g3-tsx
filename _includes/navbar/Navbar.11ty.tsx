// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import NavbarBrand from "./NavbarBrand.11ty";
import site from "../site.json";
import NavbarStart from "./NavbarStart.11ty";
import NavbarEnd from "./NavbarEnd.11ty";

type NavbarProps = {};

const Navbar = (props: NavbarProps): JSX.Element => {
  // noinspection BadExpressionStatementJS
  props;
  return (
    <nav id="navbar" className="navbar is-spaced is-dark">
      <div className="container">
        <NavbarBrand {...site}></NavbarBrand>
        <div id="navMenuIndex" className="navbar-menu">
          <NavbarStart items={site.start.items}></NavbarStart>
          <NavbarEnd
            buttons={site.end.buttons}
            links={site.end.links}
          ></NavbarEnd>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
