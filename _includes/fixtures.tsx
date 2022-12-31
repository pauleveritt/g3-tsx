import { Window } from "happy-dom";

export function makeDocument(html: string) {
  const thisWindow = new Window({
    settings: {
      disableJavaScriptFileLoading: true,
      disableJavaScriptEvaluation: true,
      disableCSSFileLoading: true,
      enableFileSystemHttpRequests: false,
    },
  });
  thisWindow.document.write(html);
  return thisWindow.document;
}
