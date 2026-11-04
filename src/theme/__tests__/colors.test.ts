import { shade, textColorOn, withAlpha } from "../colors";
import { getTypeInfo, pokemonTypes, typeNames } from "../pokemonTypes";

describe("textColorOn", () => {
  it("uses dark text on light type colors and white on dark ones", () => {
    expect(textColorOn(pokemonTypes.electric.color)).not.toBe("#FFFFFF");
    expect(textColorOn(pokemonTypes.ice.color)).not.toBe("#FFFFFF");
    expect(textColorOn(pokemonTypes.ghost.color)).toBe("#FFFFFF");
    expect(textColorOn(pokemonTypes.fighting.color)).toBe("#FFFFFF");
  });
});

describe("shade", () => {
  it("darkens, lightens and leaves colors alone at 0", () => {
    expect(shade("#808080", 0)).toBe("#808080");
    expect(shade("#808080", 1)).toBe("#000000");
    expect(shade("#808080", -1)).toBe("#ffffff");
    expect(shade("#ff0000", 0.5)).toBe("#800000");
  });
});

describe("withAlpha", () => {
  it("appends a two-digit alpha channel", () => {
    expect(withAlpha("#FFFFFF", 0)).toBe("#FFFFFF00");
    expect(withAlpha("#FFFFFF", 1)).toBe("#FFFFFFff");
    expect(withAlpha("#FFFFFF", 0.25)).toBe("#FFFFFF40");
  });
});

describe("pokemonTypes", () => {
  it("covers all 18 types", () => {
    expect(typeNames).toHaveLength(18);
  });

  it("falls back for unknown or missing types", () => {
    expect(getTypeInfo("stellar").label).toBe("?");
    expect(getTypeInfo(undefined).label).toBe("?");
  });
});
