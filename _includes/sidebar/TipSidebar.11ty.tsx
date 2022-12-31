// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ResourceCardAuthorProps } from "../resourcecard/ResourceCardAuthor.11ty";
import { ResourceCardProducts } from "../resourcecard/ResourceCardProducts.11ty";

export type TipSidebarProps = {
  date: string;
  author: ResourceCardAuthorProps;
  products: ResourceCardProducts;
  technologies: ResourceCardTechnologies;
  topics: ResourceCardTopics;
  body?: string;
  seealso?: SeeAlsos;
  longVideo?: Video;
  inPlaylists: InPlaylists;
};
const TipSidebar = (props: TipSidebarProps): JSX.Element => {
  // noinspection BadExpressionStatementJS
  props;
  return (
    <div>
      <button>Hello</button>
    </div>
  );
};

export default TipSidebar;
