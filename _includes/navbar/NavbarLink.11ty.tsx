// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type NavbarLinkProps = {
  color: string;
  href: string;
  key?: string;
  icon: string;
};
const NavbarLink = ({ href, color, icon }: NavbarLinkProps): JSX.Element => {
  return (
    <a class="navbar-item is-hidden-touch" href={href} target="_blank">
      <span class="icon" style={`{ color: #${color} }`}>
        <i class={`fab fa-lg fa-${icon}`} aria-label={`${icon} Icon`} />
      </span>
    </a>
  );
};

export default NavbarLink;
