// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import GuideImage from "../Image.11ty";

export type SidebarPublishedProps = {
  date: Date;
  author: {
    slug: string;
    title: string;
    thumbnail?: string;
  };
};
const SidebarPublished = ({
  date,
  author,
}: SidebarPublishedProps): JSX.Element => {
  return (
    <div className="bio-page-sidenav-published-heading">
      <p className="menu-label bio-page-sidebar-published">Published</p>
      <ul className="menu-list">
        <li>
          <article className="media">
            <figure className="media-left">
              <div className="image is-rounded is-48x48">
                <GuideImage src={author.thumbnail ? author.thumbnail : "placeholder.jpg"}
                            alt={`${author.title} Thumbnail`}
                            className="bio-resourcecard-logo"
                            width={48}

                />
              </div>
            </figure>
            <div className="media-content">
              <div className="content">
                <div className="bio-page-sidebar-published-date">{date}</div>
                <div>by:</div>
                <a href={author.slug}>{author.title}</a>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPublished;
