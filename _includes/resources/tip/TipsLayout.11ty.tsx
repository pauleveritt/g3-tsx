import h, { JSX } from "vhtml";

export type TipsLayoutTip = {
  title: string;
  slug: string;
};
export type TipsLayoutProps = {
  tips: TipsLayoutTip[];
};

export function TipsLayout({ tips }: TipsLayoutProps): JSX.Element {
  return (
    <>
      <h1>Hello Tips</h1>
      <ul>
        {tips?.map((tip) => {
          return <li aria-label="tip">{tip.title}</li>;
        })}
      </ul>
    </>
  );
}

// @ts-ignore
export function render(data: any): JSX.Element {
  const tips: TipsLayoutTip[] = [];
  return <TipsLayout tips={tips} />;
}
