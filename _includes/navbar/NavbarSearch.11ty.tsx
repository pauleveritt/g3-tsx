// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type NavbarSearchProps = {};
const NavbarSearch = (props: NavbarSearchProps): JSX.Element => {
  // noinspection BadExpressionStatementJS
  props;
  return (
    <div class="navbar-item navbar-search">
      <div class="control">
        <div class={`dropdown is-NOT-active`}>
          <div class="dropdown-trigger">
            <button class="button is-black">
              <span class="icon">
                <i class="fas fa-search" />
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="search-menu" role="menu">
            <div class="dropdown-content">
              <input />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;
