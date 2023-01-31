// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardLogoProps = {
  thumbnail: string;
};
const ResourceCardLogo = ({
  thumbnail,
}: ResourceCardLogoProps): JSX.Element => {
  return (
    <div class="media-left">
      <figure class="image is-64x64">
        <img src={thumbnail} alt="Logo" />
      </figure>
    </div>
  );
};

export default ResourceCardLogo;
