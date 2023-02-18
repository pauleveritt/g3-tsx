# TODO

## Now

- Playlists
  - Get some Markdown copied over

## Next

- Get a placeholder.jpg into the site

## Soon

- Change label to be topic:label key
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
- Style misfire in code snippets on `number`

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

- Change tutorialItems to remove prefix

      <Helmet title={`${page.pageTitle} - ${helmet.siteTitle}`}>
        <html lang="en" />
        <meta charSet={`utf-8`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv={`X-UA-Compatible`} />
        <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
        <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
        <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
        <meta property="og:type" content="article" />
        {twitterCard && (
          <meta name="description" content={twitterCard.page.description} />
        )}
        {twitterCard && (
          <meta name={`twitter:card`} content={`summary_large_image`} />
        )}
        {twitterCard && (
          <meta name={`twitter:site`} content={twitterCard.site.siteName} />
        )}
        {twitterCard && (
          <meta name={`twitter:creator`} content={twitterCard.site.creator} />
        )}
        {twitterCard && (
          <meta name={`twitter:title`} content={twitterCard.page.title} />
        )}
        {twitterCard && (
          <meta
            name={`twitter:description`}
            content={twitterCard.page.description}
          />
        )}
        {twitterCard && (
          <meta name={`twitter:image`} content={twitterCard.page.image} />
        )}
        <body className="layout-default" />
        {Favicon}
        <script
          defer={true}
          src="https://use.fontawesome.com/releases/v6.0.0-beta3/js/all.js"
        />
      </Helmet>

  const twitterCardPage: TwitterCardPage = {
  title: tip.title,
  description: tip.subtitle ? tip.subtitle : '',
  image: tip.thumbnail
  ? `https://www.jetbrains.com${tip.thumbnail.publicURL}`
  : tip.cardThumbnail
  ? `https://www.jetbrains.com${tip.cardThumbnail.publicURL}`
  : ''
  };

