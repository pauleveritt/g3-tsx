import { h, Suspense } from "nano-jsx";
import { BaseLayout } from "./BaseLayout.11ty";

export type PageLayoutProps = {
  title: string;
  children: string[];
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function GetName() {
  await sleep(1000)
  return "Paul Is Awesome!";
}

function PaulComponent({ hero = "Yes" } : {hero: string}) {
  return (<div>
    <h1>{hero}</h1>
    <h2>This is happening</h2>
  </div>)
}

export async function PageLayout({ title, children }: PageLayoutProps) {
  const hero = await GetName();
  return (
    <BaseLayout pageTitle={title}>
      <div class="bd-main bulmaio-body">
        <div class="bd-side-background" />
        <div class="bd-main-container container content">
          <h1>Hello {title}</h1>
          <PaulComponent hero={hero} />
          <div dangerouslySetInnerHTML={{ __html: children[0] }} />
        </div>
      </div>
    </BaseLayout>
  );
}

export type PageRenderProps = {
  content: string;
  title: string;
};

export function render({ content, title }: PageRenderProps) {
  return <PageLayout title={title}>{[content]}</PageLayout>;
}
