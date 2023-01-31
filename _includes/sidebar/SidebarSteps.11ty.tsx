// noinspection ES6UnusedImports
import { h } from "nano-jsx";
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
        class="bio-page-sidebar-references-group"
        style="margin-top: 1rem"
      >
        {steps.length > 0 && (
          <>
            <p class="menu-label bio-page-sidebar-published">
              Tutorial Steps
            </p>
            <ul class="steps has-content-centered is-vertical is-small">
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
