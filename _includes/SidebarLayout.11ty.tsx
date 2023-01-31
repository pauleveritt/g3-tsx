// noinspection ES6UnusedImports
import { h } from "nano-jsx";
import { BaseLayout } from "./BaseLayout.11ty";
import Heading from "./heading/Heading.11ty";

export type SidebarLayoutProps = {
  pageTitle: string;
  subtitle?: string;
  bottomNav?: string[];
  sidebar?: string[];
  topNav?: string[];
  children: string[];
};
const SidebarLayout = ({
  pageTitle,
  subtitle,
  bottomNav,
  topNav,
  sidebar,
  children,
}: SidebarLayoutProps): JSX.Element => {
  return (
    <BaseLayout pageTitle={pageTitle}>
      <div class="bd-main bulmaio-body">
        <div class="bd-side-background" />
        <div class="bd-main-container container">
          <div class="bd-duo">
            <div class="bd-lead">
              {topNav}
              <Heading title={pageTitle} subtitle={subtitle} />
              {children}
              {bottomNav}
            </div>
            {sidebar}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SidebarLayout;
