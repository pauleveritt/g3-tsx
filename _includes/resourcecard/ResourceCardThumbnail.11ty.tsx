// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardThumbnailProps = {
  thumbnail: string;
};
const ResourceCardThumbnail = ({
  thumbnail,
}: ResourceCardThumbnailProps): JSX.Element => {
  return (
    <figure class="image is-96x96">
      <img src={thumbnail} alt={`rcg-thumbnail`} width="96" height="96" />
    </figure>
  );
};

export default ResourceCardThumbnail;
