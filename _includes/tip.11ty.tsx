// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BaseLayout from "./BaseLayout.11ty";
import BottomNav from "./pagenav/BottomNav.11ty";
import TopNav from "./pagenav/TopNav.11ty";
import { topNavProps } from "./pagenav/TopNav.test";
import { bottomNavProps } from "./pagenav/BottomNav.test";
import TipSidebar from "./sidebar/TipSidebar.11ty";
import { tipSidebarProps } from "./sidebar/TipSidebar.test";

export type TipLayoutProps = {
  content: string;
  title: string;
};

interface Context {}
export function render(
  this: Context,
  { title, content }: TipLayoutProps
): JSX.Element {
  // Convert the HTML string into a vdom thingy
  const rawContent = h("main", {
    dangerouslySetInnerHTML: { __html: content },
  });

  // Top/Bottom Nav
  const topNav = TopNav({
    ...topNavProps,
  });
  const bottomNav = BottomNav({
    ...bottomNavProps,
  });

  // Sidebars
  const sidebar = TipSidebar({ ...tipSidebarProps });

  // Main content
  // const main = (
  //   <div style={{ marginBottom: "3rem" }}>
  //     <div className="columns">
  //       {!isSSR && animatedGif && (
  //         <React.Suspense fallback={<div />}>
  //           <ClientSideOnlyPlayer animatedGif={animatedGif} />
  //         </React.Suspense>
  //       )}
  //       {screenshot && (
  //         <img
  //           src={screenshot.publicURL}
  //           alt="Tip Screenshot"
  //           width="600"
  //           loading="lazy"
  //           style={{ objectFit: "contain", objectPosition: "top" }}
  //         />
  //       )}
  //       {shortVideo && (
  //         <ShortVideo
  //           videoURL={shortVideo.url}
  //           authorLabel={tip.author.label}
  //           slug={tip.slug}
  //           posterURL={shortPosterURL}
  //           posterNumber={shortVideo.posterNumber}
  //         />
  //       )}
  //       <div
  //         className="column content"
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <div dangerouslySetInnerHTML={{ __html: tip.leadin }} />
  //         <div>
  //           {tip.hasBody && (
  //             <ScrollLink
  //               activeClass="active"
  //               className="button is-light"
  //               to="in-depth"
  //               spy={true}
  //               smooth={true}
  //               offset={0}
  //               duration={500}
  //               style={{ width: "auto" }}
  //             >
  //               Learn More
  //             </ScrollLink>
  //           )}
  //           {longVideo && (
  //             <ScrollLink
  //               activeClass="active"
  //               className="button is-light"
  //               to="full-video"
  //               spy={true}
  //               smooth={true}
  //               offset={0}
  //               duration={500}
  //               style={{ width: "auto", marginLeft: "0.5em" }}
  //             >
  //               Full Video
  //             </ScrollLink>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //     {tip.hasBody && (
  //       <Element
  //         name="in-depth"
  //         className="element"
  //         style={{ marginTop: "1rem" }}
  //       >
  //         <header className="is-size-3 is-bold">In Depth</header>
  //         <div className="columns">
  //           <div className="column is-11-desktop content">
  //             <MDXRenderer>{tip.body}</MDXRenderer>
  //           </div>
  //         </div>
  //       </Element>
  //     )}
  //     {tip.seealso && (
  //       <Element
  //         name="see-also"
  //         className="element"
  //         style={{ marginTop: "1rem" }}
  //       >
  //         <SeeAlso items={tip.seealso} />
  //       </Element>
  //     )}
  //   </div>
  // );

  return <BaseLayout pageTitle={title}>{rawContent}</BaseLayout>;
}
