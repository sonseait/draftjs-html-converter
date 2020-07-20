export enum InlineStyle {
  Bold = "BOLD",
  Code = "CODE",
  Italic = "ITALIC",
  StrikeThrough = "STRIKETHROUGH",
  Underline = "UNDERLINE",
}

export const styleMap: Record<
  InlineStyle,
  {
    element: string;
    class?: string;
  }
> = {
  [InlineStyle.Bold]: {
    element: "strong",
  },
  [InlineStyle.Code]: {
    element: "code",
  },
  [InlineStyle.Italic]: {
    element: "em",
  },
  [InlineStyle.StrikeThrough]: {
    element: "del",
  },
  [InlineStyle.Underline]: {
    element: "span",
    class: "underline",
  },
};
