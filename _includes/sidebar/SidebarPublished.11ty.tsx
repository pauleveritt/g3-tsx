// noinspection ES6UnusedImports
import { h } from "nano-jsx";

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
    <div class="bio-page-sidenav-published-heading">
      <p class="menu-label bio-page-sidebar-published">Published</p>
      <ul class="menu-list">
        <li>
          <article class="media">
            <figure class="media-left">
              <div class="image is-rounded is-48x48">
                <img
                  src={author.thumbnail ? author.thumbnail : "placeholder.jpg"}
                  alt={`${author.title} Thumbnail`}
                  width="48"
                  height="48"
                  class="bio-resourcecard-logo"
                />
              </div>
            </figure>
            <div class="media-content">
              <div class="content">
                <div class="bio-page-sidebar-published-date">{date}</div>
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
