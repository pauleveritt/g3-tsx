// noinspection ES6UnusedImports
import { h, Fragment } from "nano-jsx";

export type NavbarBrandProps = {
  rootURL: string;
  siteLogo: string;
  siteTitle: string;
};

const NavbarBrand = ({
  rootURL,
  siteLogo,
  siteTitle,
}: NavbarBrandProps)=> {
  return (
    <Fragment>
      <div class="navbar-brand">
        <a href={rootURL} class="navbar-item bio-navbar-brand">
          <img
            src={`/assets/${siteLogo}`}
            class="bio-navbar-logo-image"
            alt="Logo"
            width="28"
            height="28"
          />
        </a>
        <a href={rootURL} class="navbar-item bio-navbar-brand">
          {siteTitle}
        </a>
        <div
          id="navbarBurger"
          aria-label="burger"
          class="navbar-burger burger"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </Fragment>
  );
};

export default NavbarBrand;
