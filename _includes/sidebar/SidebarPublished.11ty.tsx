// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

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
                <img
                  src={author.thumbnail ? author.thumbnail : "placeholder.jpg"}
                  alt={`${author.title} Thumbnail`}
                  width="48"
                  height="48"
                  className="bio-resourcecard-logo"
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
