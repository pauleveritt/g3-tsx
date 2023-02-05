import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections, SiteContext } from "../../models";
import { byRole } from "../../../src/TestCases";
import { AuthorReference } from "./AuthorModels";

export type AuthorsLayoutProps = {
  authors: AuthorReference[];
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
      {authors.map((author) => {
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
  collections: Collections;
  content: string;
  title: string;
  subtitle?: string;
  page: {
    url: string;
  };
};

export function render(
  this: SiteContext,
  { collections, content, title, subtitle, page }: AuthorsRenderProps
): JSX.Element {
  // Schedule a post-build validation for this view
  this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);
  const authors: AuthorReference[] = Object.values(
    collections.authorReferences
  ).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
  return (
    <AuthorsLayout
      authors={authors}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
