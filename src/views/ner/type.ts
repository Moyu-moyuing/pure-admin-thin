export interface Token {
  text: string; // Token的文本内容
  entity?: Entity; // 如果此Token是一个实体，则此属性存储实体的信息
}
export interface Entity {
  id: string; // 唯一的实体ID
  text: string; // 实体的文本内容
  type: string; // 实体的类型，如"人物", "地点"等
}
export interface Relationship {
  sourceEntityId: string; // 源实体的ID
  targetEntityId: string; // 目标实体的ID
  type: string; // 关系的类型，如"", "工作于"等
}
export const testTokens: Token[] = [
  {
    text: "马云",
    entity: {
      id: "e1",
      text: "马云",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "阿里巴巴",
    entity: {
      id: "e2",
      text: "阿里巴巴",
      type: "公司"
    }
  },
  {
    text: "的创始人。"
  },
  {
    text: "他与"
  },
  {
    text: "张勇",
    entity: {
      id: "e3",
      text: "张勇",
      type: "人物"
    }
  },
  {
    text: "合作多年。"
  },
  {
    text: "马云",
    entity: {
      id: "e4",
      text: "马云",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "阿里巴巴",
    entity: {
      id: "e5",
      text: "阿里巴巴",
      type: "公司"
    }
  },
  {
    text: "的创始人。"
  },
  {
    text: "他与"
  },
  {
    text: "张勇",
    entity: {
      id: "e6",
      text: "张勇",
      type: "人物"
    }
  },
  {
    text: "合作多年。"
  }
];

export const testRelationships: Relationship[] = [
  {
    sourceEntityId: "e1",
    targetEntityId: "e2",
    type: "创始人"
  },
  {
    sourceEntityId: "e1",
    targetEntityId: "e3",
    type: "合作"
  },
  {
    sourceEntityId: "e4",
    targetEntityId: "e5",
    type: "创始人"
  },
  {
    sourceEntityId: "e6",
    targetEntityId: "e4",
    type: "合作"
  }
];
