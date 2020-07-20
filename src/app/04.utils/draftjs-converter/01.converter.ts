import { BlockType, getTags } from "./block-type";
import _ from "lodash";
import {
  Block,
  toTag,
  InlineStyleRange,
  toStartTag,
  toEndTag,
} from "./00.types";
import { EntityPart, EntityConfig, entityMaps } from "./entity-map";
import { styleMap } from "./inline-style";

export const convert = (json: string): string => {
  try {
    const { blocks, entityMap } = JSON.parse(json) as {
      blocks: Block[];
      entityMap?: Record<string, EntityConfig>;
    };
    if (!blocks || blocks.length === 0) return "N/A";

    const formattedBlocks = blocks.map((b: Block) => {
      const configs = _.sortBy(
        [...b.inlineStyleRanges, ...b.entityRanges],
        "offset"
      );

      if (configs.length === 0) {
        return {
          b,
          formatted: toTag({
            tag: getTags(b.type)[0],
            content: b.text,
            props: {},
          }),
        };
      }

      let result = "";

      for (let i = 0; i < b.text.length; i += 1) {
        const startTagConfig = configs.filter((c) => c.offset === i);
        const endTagConfig = configs
          .filter((c) => c.offset + c.length === i)
          .reverse();
        result += startTagConfig
          .map((c) => {
            if ((c as InlineStyleRange).style) {
              const { element, class: cls } = styleMap[
                (c as InlineStyleRange).style
              ];
              return toStartTag({
                tag: element,
                props: {
                  class: cls,
                },
              });
            } else if ((c as EntityPart).key !== undefined && entityMap) {
              const { element } = entityMaps[
                entityMap[(c as EntityPart).key].type
              ];
              return toStartTag({
                tag: element,
                props: {
                  data: entityMap[(c as EntityPart).key].data,
                },
              });
            }
            return "";
          })
          .join("");

        result += endTagConfig
          .map((c) => {
            if ((c as InlineStyleRange).style) {
              const { element } = styleMap[(c as InlineStyleRange).style];
              return toEndTag({
                tag: element,
                props: {},
              });
            } else if ((c as EntityPart).key !== undefined && entityMap) {
              const { element } = entityMaps[
                entityMap[(c as EntityPart).key].type
              ];
              return toEndTag({
                tag: element,
                props: {
                  data: entityMap[(c as EntityPart).key].data,
                },
              });
            }
            return "";
          })
          .join("");

        result += b.text[i];
      }

      const tag = getTags(b.type);

      return {
        b,
        formatted: toTag({
          tag: tag[0],
          content: result,
          props: {},
        }),
      };
    });

    const result = formattedBlocks
      .reduce<string[]>((acc, b, index) => {
        if (
          b.b.type === BlockType.UNORDERED_LIST_ITEM ||
          b.b.type === BlockType.ORDERED_LIST_ITEM
        ) {
          if (
            index === 0 ||
            (formattedBlocks[index - 1].b.type !==
              BlockType.UNORDERED_LIST_ITEM &&
              formattedBlocks[index - 1].b.type !== BlockType.ORDERED_LIST_ITEM)
          ) {
            acc.push(
              b.b.type === BlockType.UNORDERED_LIST_ITEM ? "<ul>" : "<ol>"
            );
          }
        }
        acc.push(b.formatted);
        if (
          b.b.type === BlockType.UNORDERED_LIST_ITEM ||
          b.b.type === BlockType.ORDERED_LIST_ITEM
        ) {
          if (
            index === formattedBlocks.length - 1 ||
            (formattedBlocks[index + 1].b.type !==
              BlockType.UNORDERED_LIST_ITEM &&
              formattedBlocks[index + 1].b.type !== BlockType.ORDERED_LIST_ITEM)
          ) {
            acc.push(
              b.b.type === BlockType.UNORDERED_LIST_ITEM ? "</ul>" : "</ol>"
            );
          }
        }
        return acc;
      }, [])
      .join("\r\t");

    return `<article>\n\t${result}\n</article>`;
  } catch (e) {
    console.log(e);
    return "Can't parse json";
  }
};
