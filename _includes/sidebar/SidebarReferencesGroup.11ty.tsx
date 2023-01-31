// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type SidebarReferencesGroupProps = {
  reftype: string;
  accent: string;
  references: string[];
};
const SidebarReferencesGroup = ({
  reftype,
  accent,
  references,
}: SidebarReferencesGroupProps): JSX.Element => {
  return (
    <div class="bio-page-sidebar-references-group">
      {references.length > 0 && (
        <>
          <p class="menu-label" style="margin-top: 1rem">
            <span
              style="text-transform: uppercase"
              class="bio-page-sidebar-references-reftype"
            >
              {reftype}
            </span>
          </p>
          <div>
            {references.map((reference) => (
              <a
                href={`/${reftype}/${reference}/`}
                style="display: inline-block; margin: 0 0.2rem"
                class="bio-page-sidebar-references-href"
              >
                <span
                  class={`tag bio-page-sidebar-references-label has-text-${accent}`}
                >
                  {reference}
                </span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarReferencesGroup;
