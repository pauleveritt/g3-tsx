// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import SidebarStep from "./SidebarStep.11ty";

type Step = {
  label: string;
  href: string;
};
export type SidebarStepsProps = {
  steps: Step[];
  currentSlug?: string;
};
const SidebarSteps = ({
  currentSlug,
  steps,
}: SidebarStepsProps): JSX.Element => {
  {
    return (
      <div
        className="bio-page-sidebar-references-group"
        style="margin-top: 1rem"
      >
        {steps.length > 0 && (
          <>
            <p className="menu-label bio-page-sidebar-published">
              Tutorial Steps
            </p>
            <ul className="steps has-content-centered is-vertical is-small">
              {steps.map((step, index) => (
                <SidebarStep
                  label={step.label}
                  target={step.href}
                  marker={index + 1}
                  isActive={step.href === currentSlug}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
};

export default SidebarSteps;
