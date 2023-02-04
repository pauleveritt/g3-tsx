# TODO

## Now

- Write a legit E2E `Eleventy` test

## Next

- De-prop the layouts
- Make schemas for just the frontmatter part
- Get a placeholder.jpg into the site

## Soon

- Sort out children vs. content and the vhtml typing issue
- Clean up the content

## Eventually

- A real `resourceType`
- Re-invent collections
  - Change fixtures and typing to treat `collections.all` with the correct structure
  - Have `collections.resources` which is an object with properties for `all`, etc.
  - Use Map to allow iteration and preserve default sort order
  - Investigate `--incremental` by storing the validated resource on the `collections.all` instance
    - Learn watch events and add/edit/delete
    - Both for full and incremental
- Coverage

## G3

- Screenshots in Markdown folders
- HTML `<video>` widget

- Lunr
- NavbarSearch reveal panel
- JSON Schema writing

- "MDX" by enabling WebC as markdown template language
- Implement NavbarBrand toggle menu
- TwitterCard stuff and other Helmet
- No playlist support in TopNav particularly aria-*
  - Or in TipSidebar `inPlaylist`
- No `ScrollLink` component in `SidebarDoclink`
- Fix all style={} to not use `textAlign` instead use `text-align`
- Site prefix stuff e.g. starting a `/tips/` instead of `/webstorm-guide/tips/`
- Tutorials

## Nice To Have

- JSON Schemas
- HTMX

## Finished

- Individual pages for each reference type
- Get rid of readMarkdownTree and duplicative tests
- Reorg content models to getAuthors etc. to the actual resource


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
