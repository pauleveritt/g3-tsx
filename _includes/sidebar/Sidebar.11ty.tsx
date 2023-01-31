// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type SidebarProps = {
  children: string[];
};
const Sidebar = ({ children }: SidebarProps): JSX.Element => {
  return <aside class="bd-side bio-page-sidebar">{children}</aside>;
};

export default Sidebar;
