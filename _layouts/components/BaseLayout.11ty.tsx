// @ts-ignore
import h, { JSX } from "vhtml";

type BaseLayoutProps = {
  pageTitle: string;
  age?: number;
  children: string[];
};
const BaseLayout = ({
  pageTitle,
  age,
  children,
}: BaseLayoutProps): JSX.Element => (
  <div>
    <h1>
      {pageTitle}: {age}
    </h1>
    <div>{children}</div>
  </div>
);

export default BaseLayout;
