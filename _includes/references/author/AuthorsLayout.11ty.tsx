import { h } from "nano-jsx";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections } from "../../models";

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
};

export function render({
  collections,
  content,
  title,
  subtitle,
}: AuthorsRenderProps): JSX.Element {
  // Flatten/de-normalize the joins, e.g. author
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
