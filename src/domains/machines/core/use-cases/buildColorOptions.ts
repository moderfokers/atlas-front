import { IColor, IMachine } from "../../data/machine-entities";


export const buildColorOptions = (colors: string[]): IColor[] =>
  colors.map((color, index) => ({ name: color, id: index }));

