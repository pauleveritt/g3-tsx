// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type NavbarButtonProps = {
  accent: string;
  href: string;
  key?: string;
  label: string;
};
const NavbarButton = ({
  accent,
  href,
  label,
}: NavbarButtonProps): JSX.Element => {
  return (
    <p class="control">
      <a
        class={`button is-fullwidth-mobile is-${accent}`}
        href={href}
        target="_new"
        data-testid={`navbutton-a`}
      >
        <strong>{label}</strong>
      </a>
    </p>
  );
};

export default NavbarButton;
