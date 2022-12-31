// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BaseLayout from "./BaseLayout.11ty";

export type SidebarLayoutProps = {
  pageTitle: string;
  children: string[];
};
const SidebarLayout = ({
  pageTitle,
  children,
}: SidebarLayoutProps): JSX.Element => {
  return (
    <BaseLayout pageTitle={pageTitle}>
      <div className="bd-main bulmaio-body">
        <div className="bd-side-background" />
        <div className="bd-main-container container">
          <div className="bd-duo">
            <div className="bd-lead">
              {/*{topNav}*/}
              {/*<Heading title={pageTitle} subtitle={subtitle} />*/}
              {children}
              {/*{bottomNav}*/}
            </div>
            {/*{sidebar}*/}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SidebarLayout;
