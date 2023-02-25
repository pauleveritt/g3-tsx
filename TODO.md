# TODO

## Now

- Playlists
  - Get some Markdown copied over
  - Sidebar panel "in playlists"

## Next

- Check the test coverage
- Copy PyCharm Guide over
- Ensure `embed:` alternative with `{% include %}` works

## Soon

- Lunr
  - NavbarSearch reveal panel
- Clean up the content
- Get a placeholder.jpg into the site
- JSON Schema writing
- Implement NavbarBrand toggle menu
- TwitterCard stuff and other Helmet
- Allow running in `inputSrc` of `webstorm-guide` (to prevent links from including `/webstorm-guide/`)
  - Or possibly [pathPrefix](https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix)

## Eventually

- A real `resourceType` for collections, page
- Sort out children vs. content and the vhtml typing issue
- Investigate `--incremental` by storing the validated resource on the `collections.all` instance
  - Learn watch events and add/edit/delete
  - Both for full and incremental
- Coverage
- No `ScrollLink` component in `SidebarDoclink`
- Site prefix stuff e.g. starting a `/tips/` instead of `/webstorm-guide/tips/`

## G3

- "MDX" by enabling WebC as markdown template language
- Tutorials
- Style misfire in code snippets on `number`
- Re-invent collections
  - Change fixtures and typing to treat `collections.all` with the correct structure
  - Have `collections.resources` which is an object with properties for `all`, etc.
  - Use Map to allow iteration and preserve default sort order

## Nice To Have

- JSON Schemas
- HTMX

## Finished

- Individual pages for each reference type
- Get rid of readMarkdownTree and duplicative tests
- Reorg content models to getAuthors etc. to the actual resource
- Baked-in approach to E2E testing that runs during build
  - View renders have `this.addTestCase` to register some assertions for a resulting page at a URL
  - After build, all the test cases are run, with an exception for violations
- Move layouts out of the root, into `layouts/`
- Move generic models out of `_includes` into `src`
- Start some docs
- Land a proper `resourceType`
- Create re-invented collections
  - More automated via a call from eleventy config
  - Pre-sorted `Set`
- De-prop the layouts
- Change referenceResources to linkedResources
- Change TipResource to Tip
  - Then get rid of that key in config
- Remove `content` from `BaseData`
- Wire in TipSidebar into TipLayout
- Make schemas for just the frontmatter part
- Change label to be topic:label key


## WS+CWM Issues

- Markdown preview 404
  - When Khalid made me follow him on my machine, and we opened `.md`, preview showed 404
- Breadcrumbs are visible but not activated on click
- Asks to forward the debugger port
- Doesn't highlight links in run window
- Can't view images in editor

## Things To Show Zach

- Vite
- TS
- TSX
- Vitest
- TypeBox "content types"
- Switch to collections.author rather than collections.authorReferences in get**

# Manual Migration Tasks

- Convert any `embed:` in Markdown files to include from local `demos` directory
- Change tutorialItems to remove prefix
