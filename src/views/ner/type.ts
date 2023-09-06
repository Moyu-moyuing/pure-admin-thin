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
    text: "马化腾",
    entity: {
      id: "e1",
      text: "马化腾",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "腾讯",
    entity: {
      id: "e2",
      text: "腾讯",
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
    text: "张小龙",
    entity: {
      id: "e3",
      text: "张小龙",
      type: "人物"
    }
  },
  {
    text: "合作多年。"
  },
  {
    text: "马化腾",
    entity: {
      id: "e4",
      text: "马化腾",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "腾讯",
    entity: {
      id: "e5",
      text: "腾讯",
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
    text: "张小龙",
    entity: {
      id: "e6",
      text: "张小龙",
      type: "人物"
    }
  },
  {
    text: "合作多年。"
  },
  {
    text: "马化腾",
    entity: {
      id: "e7",
      text: "马化腾",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "腾讯",
    entity: {
      id: "e8",
      text: "腾讯",
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
    text: "张小龙",
    entity: {
      id: "e9",
      text: "张小龙",
      type: "人物"
    }
  },
  {
    text: "合作多年。"
  },
  {
    text: "马化腾",
    entity: {
      id: "e10",
      text: "马化腾",
      type: "人物"
    }
  },
  {
    text: "是"
  },
  {
    text: "腾讯",
    entity: {
      id: "e11",
      text: "腾讯",
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
    text: "张小龙",
    entity: {
      id: "e12",
      text: "张小龙",
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
    targetEntityId: "e10",
    type: "合作"
  },
  {
    sourceEntityId: "e7",
    targetEntityId: "e8",
    type: "创始人"
  },
  {
    sourceEntityId: "e9",
    targetEntityId: "e7",
    type: "合作"
  },
  {
    sourceEntityId: "e10",
    targetEntityId: "e11",
    type: "创始人"
  },
  {
    sourceEntityId: "e12",
    targetEntityId: "e7",
    type: "合作"
  }
];
export const testEntityType = ["人物", "公司"];
export const testRelationType = ["创始人", "合作"];
