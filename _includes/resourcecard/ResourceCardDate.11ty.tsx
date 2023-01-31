// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardDateProps = {
  date?: string;
};
const ResourceCardDate = ({ date }: ResourceCardDateProps): JSX.Element => {
  return (
    <div class="level-right is-size-7 has-text-grey">
      <span class="level-item bio-common-card-published">{date}</span>
    </div>
  );
};

export default ResourceCardDate;
