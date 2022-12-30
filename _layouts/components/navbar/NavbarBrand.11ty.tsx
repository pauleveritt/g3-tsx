// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type NavbarBrandProps = {
  rootURL: string;
  siteLogo: string;
  siteTitle: string;
};

const NavbarBrand = ({
  rootURL,
  siteLogo,
  siteTitle,
}: NavbarBrandProps): JSX.Element => {
  return (
    <>
      <div className="navbar-brand">
        <a href={rootURL} className="navbar-item bio-navbar-brand">
          <img
            src={`/assets/${siteLogo}`}
            className="bio-navbar-logo-image"
            alt="Logo"
            width="28"
            height="28"
          />
        </a>
        <a href={rootURL} className="navbar-item bio-navbar-brand">
          {siteTitle}
        </a>
        <div
          id="navbarBurger"
          aria-label="burger"
          className="navbar-burger burger"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </>
  );
};

export default NavbarBrand;
