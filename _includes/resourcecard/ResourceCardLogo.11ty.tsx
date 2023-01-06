// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardLogoProps = {
  thumbnail: string;
};
const ResourceCardLogo = ({
  thumbnail,
}: ResourceCardLogoProps): JSX.Element => {
  return (
    <div className="media-left">
      <figure className="image is-64x64">
        <img src={thumbnail} alt="Logo" />
      </figure>
    </div>
  );
};

export default ResourceCardLogo;
