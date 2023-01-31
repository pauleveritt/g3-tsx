// noinspection ES6UnusedImports
import { h } from "nano-jsx";

type Entry = {
  label: string;
  slug: string;
};

export type TopNavProps = {
  parent: Entry;
  siblings: Entry[];
  currentSlug: string;
  playlistLabel?: string;
  kind?: string;
};

const TopNav = ({
  parent,
  siblings,
  currentSlug,
  playlistLabel,
  kind = "Tip",
}: TopNavProps): JSX.Element => {
  const currentSlugIndex = siblings.findIndex((s) => s.slug === currentSlug);
  const previous = currentSlugIndex > 0 ? siblings[currentSlugIndex - 1] : null;
  const next =
    currentSlugIndex < siblings.length ? siblings[currentSlugIndex + 1] : null;

  const playlistPrefix = playlistLabel ? `?playlist=${playlistLabel}` : "";
  return (
    <div style={`marginBottom: '1em'`}>
      <div style={`textAlign: 'center', marginBottom: '0.5em' `}>
        {parent && (
          <a
            href={`${parent.slug}`}
            class="topnav-previous button is-size-7"
            style={`border: "none" `}
            title={parent.label}
          >
            <span class="icon">
              <i class="fas fa-arrow-up" />
            </span>
          </a>
        )}
        <a
          href={parent.slug}
          class="topnav-previous button is-size-7"
          style={`border: "none" `}
          title={parent.label}
        >
          <span>Up to {parent.label}</span>
        </a>
      </div>
      <div class="columns">
        <div class="column has-text-left is-one-quarter-desktop is-hidden-mobile">
          {previous && (
            <a
              href={`${previous.slug}${playlistPrefix}`}
              class="topnav-previous button"
              style={`border: "none" `}
              title={previous.label}
            >
              <span class="icon">
                <i class="fas fa-arrow-left" />
              </span>
              <span style={`paddingLeft: '1em' `}>Previous</span>
            </a>
          )}
        </div>
        <div class="column has-text-centered is-one-half is-full-mobile">
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger" style={`width: '20rem' `}>
              <button class="button" aria-controls="dropdown-menu2">
                <span>
                  {kind} {currentSlugIndex + 1} of {siblings.length}
                </span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" />
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <strong class="is-size-5">{parent.label}</strong>
                </div>
                <hr class="dropdown-divider" />
                {siblings.map((entry) => (
                  <a
                    href={`${entry.slug}${playlistPrefix}`}
                    class="dropdown-item"
                  >
                    {entry.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div class="column has-text-right is-one-quarter-desktop is-hidden-mobile">
          {next && (
            <a
              href={`${next.slug}${playlistPrefix}`}
              class="topnav-previous button"
              style={`border: "none"`}
              title={next.label}
            >
              <span style={`paddingLeft: '1em' `}>Next</span>
              <span class="icon">
                <i class="fas fa-arrow-right" />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
