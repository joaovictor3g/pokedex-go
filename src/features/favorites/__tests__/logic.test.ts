import { toggleIn } from "../logic";

describe("toggleIn", () => {
  it("adds a missing Pokémon in number order", () => {
    const list = [
      { id: 1, name: "bulbasaur" },
      { id: 150, name: "mewtwo" },
    ];
    expect(toggleIn(list, { id: 25, name: "pikachu" }).map((p) => p.id)).toEqual([1, 25, 150]);
  });

  it("removes a Pokémon that is already there instead of duplicating it", () => {
    const list = [{ id: 25, name: "pikachu" }];
    expect(toggleIn(list, { id: 25, name: "pikachu" })).toEqual([]);
  });

  it("stores only the id and name", () => {
    const extra = { id: 7, name: "squirtle", types: ["water"] } as { id: number; name: string };
    expect(toggleIn([], extra)).toEqual([{ id: 7, name: "squirtle" }]);
  });
});
