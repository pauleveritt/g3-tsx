import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections } from "../../models";
import { Assertions, byRole } from "../../../src/TestCases";

export type AuthorsLayoutAuthor = {
  title: string;
  slug: string;
};
export type AuthorsLayoutProps = {
  authors: AuthorsLayoutAuthor[];
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
            <a href={author.slug}>{author.title}</a>
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

export interface AuthorsContext {
  addTestCase(url: string, assertions: Assertions): void;
}

export function render(
  this: AuthorsContext,
  { collections, content, title, subtitle, page }: AuthorsRenderProps
): JSX.Element {
  // Schedule a post-build validation for this view
  this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);

  const authors: AuthorsLayoutAuthor[] = Object.values(
    collections.authorReferences
  ).map((author) => {
    return {
      title: author.title,
      slug: author.slug,
    };
  });
  return (
    <AuthorsLayout
      authors={authors}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
