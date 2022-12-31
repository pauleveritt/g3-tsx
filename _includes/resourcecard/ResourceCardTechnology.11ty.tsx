// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

type ResourceCardTechnology = {
  label: string;
  slug: string;
};

export type ResourceCardTechnologyProps = {
  items: ResourceCardTechnology[];
};
const ResourceCardTechnology = ({
  items,
}: ResourceCardTechnologyProps): JSX.Element => {
  return (
    <>
      {items.map((technology) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded">
            <a href={technology.slug} className="has-text-danger">
              {technology.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTechnology;
