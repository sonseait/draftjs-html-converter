import { InlineStyle } from "./inline-style";
import { BlockType } from "./block-type";
import { EntityPart } from "./entity-map";

export enum PartType {
  Entity,
  InlineStyle,
  None,
}

export interface InlineStyleRange {
  style: InlineStyle;
  length: number;
  offset: number;
}

export interface Block {
  type: BlockType;
  inlineStyleRanges: InlineStyleRange[];
  text: string;
  entityRanges: EntityPart[];
}

interface ToTagConfig {
  tag: string;
  props: Record<string, string | object | undefined>;
}

export const toStartTag = (config: ToTagConfig): string => {
  const props = Object.keys(config.props)
    .reduce<string[]>((acc, k) => {
      if (config.props[k]) {
        acc.push(
          `${k}=${
            typeof config.props[k] === "string"
              ? `"${config.props[k]}"`
              : `{${JSON.stringify(config.props[k])}}`
          }`
        );
      }
      return acc;
    }, [])
    .join(" ");

  return props ? `<${config.tag} ${props}>` : `<${config.tag}>`;
};

export const toEndTag = (config: ToTagConfig): string => {
  return `</${config.tag}>`;
};

/**
 * config to html tag
 */
export const toTag = (config: ToTagConfig & { content: string }): string => {
  return `${toStartTag(config)}${config.content}${toEndTag(config)}`;
};
