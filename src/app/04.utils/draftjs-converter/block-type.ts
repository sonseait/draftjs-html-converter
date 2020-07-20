export enum BlockType {
  UNSTYLED = "unstyled",
  HEADER_ONE = "header-one",
  HEADER_TWO = "header-two",
  HEADER_THREE = "header-three",
  HEADER_FOUR = "header-four",
  HEADER_FIVE = "header-five",
  HEADER_SIX = "header-six",
  UNORDERED_LIST_ITEM = "unordered-list-item",
  ORDERED_LIST_ITEM = "ordered-list-item",
  BLOCKQUOTE = "blockquote",
  PULLQUOTE = "pullquote",
  CODE = "code-block",
  ATOMIC = "atomic",
}

export function getTags(blockType: BlockType): string[] {
  switch (blockType) {
    case BlockType.HEADER_ONE:
      return ["h1"];
    case BlockType.HEADER_TWO:
      return ["h2"];
    case BlockType.HEADER_THREE:
      return ["h3"];
    case BlockType.HEADER_FOUR:
      return ["h4"];
    case BlockType.HEADER_FIVE:
      return ["h5"];
    case BlockType.HEADER_SIX:
      return ["h6"];
    case BlockType.UNORDERED_LIST_ITEM:
    case BlockType.ORDERED_LIST_ITEM:
      return ["li"];
    case BlockType.BLOCKQUOTE:
      return ["blockquote"];
    case BlockType.CODE:
      return ["pre", "code"];
    case BlockType.ATOMIC:
      return ["figure"];
    default:
      return ["p"];
  }
}
