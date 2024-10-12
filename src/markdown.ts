import showdown from "showdown";
import { JSDOM } from "jsdom";

const removeDivAndITagsExtension = () => {
  return [
    {
      type: "lang",
      regex: /<(div|i)[^>]+>/g,
      replace: "",
    },
    {
      type: "lang",
      regex: /<\/(div|i)>/g,
      replace: "",
    },
  ];
};
export const mdToHtml = (markdown: string) => {
  const converter = new showdown.Converter({
    extensions: [removeDivAndITagsExtension],
  });
  return converter.makeHtml(markdown);
};

export const mdFromHtml = (html: string) => {
  const converter = new showdown.Converter();
  const dom = new JSDOM();
  return converter.makeMarkdown(html, dom.window.document);
};
