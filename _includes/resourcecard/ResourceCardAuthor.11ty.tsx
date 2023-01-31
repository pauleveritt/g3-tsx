// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardAuthorProps = {
  thumbnail: string;
  slug: string;
  title: string;
};
const ResourceCardAuthor = ({
  thumbnail,
  slug,
  title,
}: ResourceCardAuthorProps): JSX.Element => {
  return (
    <>
      {thumbnail && (
        <a class="level-item bio-card-author" href={slug}>
          <figure
            class="image is-rounded is-24x24"
            style="margin-left: 0.2rem; margin-right: 0.2rem"
          >
            {thumbnail && (
              <div class="image is-rounded is-24x24">
                <img
                  src={thumbnail}
                  alt={`rca-fluid`}
                  width="24px"
                  height="24px"
                  class="bio-resourcecard-logo"
                />
              </div>
            )}
          </figure>
          <span class="bio-card-author-label">{title}</span>
        </a>
      )}
    </>
  );
};

export default ResourceCardAuthor;
