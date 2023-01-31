// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type SidebarStepProps = {
  label: string;
  target: string;
  marker: number;
  isActive: boolean;
};
const SidebarStep = ({
  label,
  target,
  marker,
  isActive,
}: SidebarStepProps): JSX.Element => {
  const markerClass = isActive ? "is-info" : "is-primary";
  return (
    <li class={`steps-segment is-active`}>
      <a href={target} style="width: auto" class="has-text-dark">
        <span class={`steps-marker ${markerClass}`}>{marker}</span>
        <div class="steps-content">
          <p>{label}</p>
        </div>
      </a>
    </li>
  );
};

export default SidebarStep;
