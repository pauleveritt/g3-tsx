import { h } from "nano-jsx";
import { BaseLayout } from "../BaseLayout.11ty";

export type ReferenceLayoutProps = {
  content?: string;
  figure?: string[];
  listing: string[];
  subtitle?: string;
  title: string;
};

export function ReferenceLayoutMain({
  content,
  figure,
  listing,
  title,
  subtitle,
}: ReferenceLayoutProps): JSX.Element {
  const safeListing = (
    <div
      class="column is-three-quarters-desktop bio-resourcecards"
      dangerouslySetInnerHTML={{ __html: listing[0] }}
    />
  );
  return (
    <main class="bd-main bulmaio-body">
      <div class="bd-main-container container">
        <div class="bd-duo">
          <div class="bd-lead">
            <header class="bd-header">
              <article class="media">
                {figure && <figure class="media-left">{figure}</figure>}
                <div class="media-content">
                  <div class="content">
                    <div class="bd-header-titles">
                      <h1 class="title">{title}</h1>
                      {subtitle && <p class="subtitle is-4">{subtitle}</p>}
                    </div>
                  </div>
                </div>
              </article>
            </header>

            {content && (
              <div class="columns">
                <div class="column is-three-quarters-desktop">
                  <div
                    class="bd-content content"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            )}
            <div class="columns">{safeListing}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ReferenceLayout({
  content,
  figure,
  listing,
  title,
  subtitle,
}: ReferenceLayoutProps): JSX.Element {
  /* We do this split so that we can test the "main" part without the full <html> document */
  return (
    <BaseLayout pageTitle={title}>
      <ReferenceLayoutMain
        title={title}
        subtitle={subtitle}
        content={content}
        figure={figure}
        listing={listing}
      ></ReferenceLayoutMain>
    </BaseLayout>
  );
}
