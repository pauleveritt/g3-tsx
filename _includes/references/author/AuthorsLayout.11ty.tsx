import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { SiteCollections } from "../../models";
import { byRole } from "../../../src/TestCases";
import { AuthorReference } from "./AuthorModels";
import { RenderContext } from "../../../src/models";

export type AuthorsLayoutProps = {
  authors: Iterable<AuthorReference>;
  title: string;
  subtitle?: string;
  content: string;
};

export function AuthorsLayout({
  authors,
  title,
  subtitle,
  content,
}: AuthorsLayoutProps): JSX.Element {
  const figure = undefined;
  const listing = (
    <ul>
      {Array.from(authors).map((author) => {
        return (
          <li>
            <a href={author.url}>{author.title}</a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export type AuthorsRenderProps = {
  collections: SiteCollections;
  content: string;
  title: string;
  subtitle?: string;
  page: {
    url: string;
  };
};

export function render(
  this: RenderContext,
  { collections, content, title, subtitle, page }: AuthorsRenderProps
): JSX.Element {
  // Schedule a post-build validation for this view
  this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);
  return (
    <AuthorsLayout
      authors={collections.authorReferences.values()}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
