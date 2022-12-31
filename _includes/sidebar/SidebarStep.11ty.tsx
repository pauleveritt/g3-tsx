// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

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
    <li className={`steps-segment is-active`}>
      <a href={target} style="width: auto" className="has-text-dark">
        <span className={`steps-marker ${markerClass}`}>{marker}</span>
        <div className="steps-content">
          <p>{label}</p>
        </div>
      </a>
    </li>
  );
};

export default SidebarStep;
