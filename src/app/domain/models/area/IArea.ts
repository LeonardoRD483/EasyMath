export interface IAreas {
  areas?: Area[];
}

export interface Area {
  model?:  string;
  pk?:     number;
  fields?: Fields;
}

export interface Fields {
  name?: string;
}
