// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardTechnology = {
  label: string;
  slug: string;
};

export type ResourceCardTechnologiesProps = {
  items: ResourceCardTechnology[];
};
const ResourceCardTechnologies = ({
  items,
}: ResourceCardTechnologiesProps): JSX.Element => {
  return (
    <>
      {items.map((technology) => (
        <span class="bio-common-card-references">
          <span class="tag is-rounded">
            <a href={technology.slug} class="has-text-danger">
              {technology.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTechnologies;
