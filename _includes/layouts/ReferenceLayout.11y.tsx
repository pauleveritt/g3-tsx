import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";

export type ReferenceLayoutProps = {
  content?: string;
  figure?: string[];
  listing: string[];
  subtitle?: string;
  title: string;
};

export function ReferenceLayout({
  content,
  figure,
  listing,
  title,
  subtitle,
}: ReferenceLayoutProps): JSX.Element {
  const safeListing = (
    <div
      className="column is-three-quarters-desktop bio-resourcecards"
      dangerouslySetInnerHTML={{ __html: listing[0] }}
    />
  );

  return (
    <BaseLayout pageTitle={title}>
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
                        {subtitle && (
                          <p className="subtitle is-4">{subtitle}</p>
                        )}
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
              <div className="columns">{safeListing}</div>
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}
