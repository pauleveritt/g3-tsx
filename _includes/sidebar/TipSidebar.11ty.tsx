// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SeeAlsos } from "../seealso/SeeAlso.11ty";
import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";
import { SidebarDoclinkProps } from "./SidebarDoclink.11ty";
import Sidebar from "./Sidebar.11ty";
import SidebarReferencesGroup from "./SidebarReferencesGroup.11ty";
import SidebarDoclinks from "./SidebarDoclinks.11ty";
import { Author } from "../references/author/AuthorModels";
import { Product } from "../references/product/ProductModels";
import { Topic } from "../references/topic/TopicModels";
import { Technology } from "../references/technology/TechnologyModels";

export type TipSidebarProps = {
  date: Date;
  author: Author;
  products: Product[];
  technologies: Technology[];
  topics: Topic[];
  body?: string;
  seealsos?: SeeAlsos;
  hasLongVideo?: boolean;
};
const TipSidebar = ({
  date,
  author,
  products,
  technologies,
  topics,
  body,
  seealsos,
  hasLongVideo = false,
}: TipSidebarProps): JSX.Element => {
  const published: SidebarPublishedProps = {
    date: new Date(date),
    author: author,
  };
  const links: SidebarDoclinkProps[] = [];
  if (body) {
    links.push({ label: "In Depth", target: "in-depth" });
  }
  if (seealsos) {
    links.push({ label: "See Also", target: "see-also" });
  }
  if (hasLongVideo) {
    links.push({ label: "Full Video", target: "full-video" });
  }
  return (
    <Sidebar>
      <SidebarPublished {...published} />
      <SidebarReferencesGroup
        reftype={`technologies`}
        accent={`danger`}
        references={technologies}
      />
      <SidebarReferencesGroup
        reftype={`products`}
        accent={`info`}
        references={products}
      />
      <SidebarReferencesGroup
        reftype={`topics`}
        accent={`success`}
        references={topics}
      />
      <SidebarDoclinks links={links} />
    </Sidebar>
  );
};

export default TipSidebar;
