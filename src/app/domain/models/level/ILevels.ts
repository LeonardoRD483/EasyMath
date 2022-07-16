export interface ILevels {
  levels?: Level[];
}

export interface Level {
  model?:  string;
  pk?:     number;
  fields?: Fields;
  isBlock?: boolean;
}

export interface Fields {
  name?: string;
  area?: number;
}
