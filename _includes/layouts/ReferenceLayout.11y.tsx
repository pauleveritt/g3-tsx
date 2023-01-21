import h, { JSX } from "vhtml";
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
  return (
    <main className="bd-main bulmaio-body">
      <div className="bd-main-container container">
        <div className="bd-duo">
          <div className="bd-lead">
            <header className="bd-header">
              <article className="media">
                {figure && <figure className="media-left">{figure}</figure>}
                <div className="media-content">
                  <div className="content">
                    <div className="bd-header-titles">
                      <h1 className="title">{title}</h1>
                      {subtitle && <p className="subtitle is-4">{subtitle}</p>}
                    </div>
                  </div>
                </div>
              </article>
            </header>

            {content && (
              <div className="columns">
                <div className="column is-three-quarters-desktop">
                  <div
                    className="bd-content content"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            )}
            <div className="columns">
              <div className="column is-three-quarters-desktop bio-resourcecards">
                {listing}
              </div>
            </div>
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
