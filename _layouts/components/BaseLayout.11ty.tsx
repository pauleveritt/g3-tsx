// @ts-ignore
import h, { JSX } from "vhtml";

type BaseLayoutProps = {
  children: string[];
};
const BaseLayout = ({ children }: BaseLayoutProps): JSX.Element => (
  <div>
    <h1>...</h1>
    <div>{children}</div>
  </div>
);

export default BaseLayout;
