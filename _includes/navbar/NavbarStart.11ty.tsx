// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type NavbarMenuItem = {
  accent: string;
  cssClass: string;
  href: string;
  icon: string;
  label: string;
};
export type NavbarStartProps = {
  items: NavbarMenuItem[];
};

const NavbarStart = ({ items }: NavbarStartProps): JSX.Element => {
  return (
    <div class="navbar-start">
      {items.map((item) => (
        <a
          class={`navbar-item bd-navbar-item-${item.cssClass}`}
          href={item.href}
        >
          <span class={`icon has-text-${item.accent}`}>
            <i class={`fas fa-${item.icon}`}></i>
          </span>
          <span class="bulmaio-menu-label">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default NavbarStart;
