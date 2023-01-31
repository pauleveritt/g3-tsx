// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type SidebarDoclinkProps = {
  label: string;
  target: string;
};
const SidebarDoclink = ({
  label,
  target,
}: SidebarDoclinkProps): JSX.Element => {
  return (
    <li>
      x
      <a href={`#${target}`} style="width: auto">
        {label}
      </a>
    </li>
  );
};

export default SidebarDoclink;
