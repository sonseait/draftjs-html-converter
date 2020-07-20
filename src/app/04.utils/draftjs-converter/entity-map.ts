export enum EntityType {
  Link = "LINK",
  Image = "IMAGE",
  Mention = "MENTION",
}

export const entityMaps: Record<
  EntityType,
  {
    element: string;
  }
> = {
  [EntityType.Link]: {
    element: "Link",
  },
  [EntityType.Image]: {
    element: "img",
  },
  [EntityType.Mention]: {
    element: "Mention",
  },
};

export interface EntityPart {
  key: number;
  length: number;
  offset: number;
}

export interface EntityConfig {
  data: Record<string, string>;
  mutability: "MUTABLE" | "IMMUTABLE";
  type: EntityType;
}
