// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Tutorial } from "./TutorialModels";
import { TutorialStep } from "./TutorialStepModels";

export type TopNavProps = {
  parent: Tutorial;
  currentStep: TutorialStep;
};

const TopNav = ({ parent, currentStep }: TopNavProps): JSX.Element => {
  const siblings = parent.tutorialSteps;
  const currentSlugIndex = siblings.findIndex((s) => s == currentStep);
  const previous = currentSlugIndex > 0 ? siblings[currentSlugIndex - 1] : null;
  const next =
    currentSlugIndex < siblings.length ? siblings[currentSlugIndex + 1] : null;

  return (
    <div style={`marginBottom: '1em'`}>
      <div style={`textAlign: 'center', marginBottom: '0.5em' `}>
        <a
          href={`${parent.url}`}
          className="topnav-previous button is-size-7"
          style={`border: "none" `}
          title={parent.title}
        >
          <span className="icon">
            <i className="fas fa-arrow-up" />
          </span>
        </a>

        <a
          aria-label="Parent Tutorial"
          href={parent.url}
          className="topnav-previous button is-size-7"
          style={`border: "none" `}
          title={parent.title}
        >
          <span>Up to {parent.title}</span>
        </a>
      </div>
      <div className="columns">
        <div className="column has-text-left is-one-quarter-desktop is-hidden-mobile">
          {previous && (
            <a
              href={previous.url}
              className="topnav-previous button"
              style={`border: "none" `}
              title={previous.title}
              aria-label="Previous Step"
            >
              <span className="icon">
                <i className="fas fa-arrow-left" />
              </span>
              <span style={`paddingLeft: '1em' `}>Previous</span>
            </a>
          )}
        </div>
        <div className="column has-text-centered is-one-half is-full-mobile">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger" style={`width: '20rem' `}>
              <button className="button" aria-controls="dropdown-menu2">
                <span>
                  {currentSlugIndex + 1} of {siblings.length}
                </span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <strong className="is-size-5">{parent.title}</strong>
                </div>
                <hr className="dropdown-divider" />
                {siblings.map((entry) => (
                  <a
                    href={entry.url}
                    aria-label="Step Menu Item"
                    className={`dropdown-item${
                      entry == currentStep ? " is-active" : ""
                    }`}
                  >
                    {entry.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="column has-text-right is-one-quarter-desktop is-hidden-mobile">
          {next && (
            <a
              href={next.url}
              className="topnav-previous button"
              style={`border: "none"`}
              title={next.title}
              aria-label="Next Step"
            >
              <span style={`paddingLeft: '1em' `}>Next</span>
              <span className="icon">
                <i className="fas fa-arrow-right" />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
