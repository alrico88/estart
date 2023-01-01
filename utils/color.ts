import chroma from "chroma-js";
import { orderBy } from "lodash-es";

export function getGoodContrastLinkColor(color: string): string {
  const contrasts = [
    {
      color: "white",
      contrast: chroma.contrast(color, "white"),
    },
    {
      color: "black",
      contrast: chroma.contrast(color, "black"),
    },
  ];

  return orderBy(contrasts, "contrast", "desc")[0].color;
}
