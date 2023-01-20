// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ResourceCardAuthorProps } from "../resourcecard/ResourceCardAuthor.11ty";
import { ResourceCardTechnology } from "../resourcecard/ResourceCardTechnologies.11ty";
import { ResourceCardTopic } from "../resourcecard/ResourceCardTopics.11ty";
import { ResourceCardProduct } from "../resourcecard/ResourceCardProducts.11ty";
import { SeeAlsos } from "../seealso/SeeAlso.11ty";
import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";
import { SidebarDoclinkProps } from "./SidebarDoclink.11ty";
import Sidebar from "./Sidebar.11ty";
import SidebarReferencesGroup from "./SidebarReferencesGroup.11ty";
import SidebarDoclinks from "./SidebarDoclinks.11ty";

export type TipSidebarProps = {
  date: string;
  author: ResourceCardAuthorProps;
  products: ResourceCardProduct[];
  technologies: ResourceCardTechnology[];
  topics: ResourceCardTopic[];
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
        references={technologies ? technologies.map((t) => t.label) : []}
      />
      <SidebarReferencesGroup
        reftype={`products`}
        accent={`info`}
        references={products ? products.map((t) => t.label) : []}
      />
      <SidebarReferencesGroup
        reftype={`topics`}
        accent={`success`}
        references={topics ? topics.map((t) => t.label) : []}
      />
      <SidebarDoclinks links={links} />
    </Sidebar>
  );
};

export default TipSidebar;
