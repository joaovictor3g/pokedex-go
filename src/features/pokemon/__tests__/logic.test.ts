import {
  englishFlavorText,
  englishGenus,
  flattenChain,
  idFromUrl,
  matchesQuery,
  POKEDEX_SIZE,
  pokemonOfTheDay,
  type EvolutionNode,
  type PokemonSpecies,
} from "../logic";

const node = (name: string, id: number, evolves_to: EvolutionNode[] = []): EvolutionNode => ({
  species: { name, url: `https://pokeapi.co/api/v2/pokemon-species/${id}/` },
  evolves_to,
});

describe("idFromUrl", () => {
  it("reads the id with or without a trailing slash", () => {
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/1025")).toBe(1025);
  });
});

describe("flattenChain", () => {
  it("returns one stage per evolution step", () => {
    const chain = node("bulbasaur", 1, [node("ivysaur", 2, [node("venusaur", 3)])]);
    expect(flattenChain(chain)).toEqual([
      [{ id: 1, name: "bulbasaur" }],
      [{ id: 2, name: "ivysaur" }],
      [{ id: 3, name: "venusaur" }],
    ]);
  });

  it("keeps branching evolutions in the same stage", () => {
    const chain = node("eevee", 133, [
      node("vaporeon", 134),
      node("jolteon", 135),
      node("sylveon", 700),
    ]);
    const stages = flattenChain(chain);
    expect(stages).toHaveLength(2);
    expect(stages[1].map((p) => p.id)).toEqual([134, 135, 700]);
  });

  it("handles Pokémon that don't evolve", () => {
    expect(flattenChain(node("tauros", 128))).toEqual([[{ id: 128, name: "tauros" }]]);
  });
});

describe("matchesQuery", () => {
  const mrMime = { id: 122, name: "mr-mime" };
  const pikachu = { id: 25, name: "pikachu" };

  it("matches everything when the query is blank", () => {
    expect(matchesQuery(pikachu, "  ")).toBe(true);
  });

  it("matches names case-insensitively and with spaces for dashes", () => {
    expect(matchesQuery(pikachu, "PIKA")).toBe(true);
    expect(matchesQuery(mrMime, "mr mime")).toBe(true);
    expect(matchesQuery(mrMime, "mr-m")).toBe(true);
    expect(matchesQuery(pikachu, "chu chu")).toBe(false);
  });

  it("matches number prefixes, with or without # and zero padding", () => {
    expect(matchesQuery(pikachu, "25")).toBe(true);
    expect(matchesQuery(pikachu, "#025")).toBe(true);
    expect(matchesQuery(pikachu, "2")).toBe(true);
    expect(matchesQuery(pikachu, "26")).toBe(false);
  });
});

describe("pokemonOfTheDay", () => {
  it("is stable within a day and stays inside the Pokédex", () => {
    const morning = new Date(2026, 10, 4, 8);
    const night = new Date(2026, 10, 4, 23);
    expect(pokemonOfTheDay(morning)).toBe(pokemonOfTheDay(night));

    for (let day = 1; day <= 365; day++) {
      const id = pokemonOfTheDay(new Date(2026, 0, day));
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(POKEDEX_SIZE);
    }
  });

  it("changes from one day to the next", () => {
    expect(pokemonOfTheDay(new Date(2026, 10, 4))).not.toBe(pokemonOfTheDay(new Date(2026, 10, 5)));
  });
});

describe("species text", () => {
  const species = {
    id: 25,
    genera: [
      { genus: "ネズミポケモン", language: { name: "ja" } },
      { genus: "Mouse Pokémon", language: { name: "en" } },
    ],
    flavor_text_entries: [
      { flavor_text: "Old\nentry", language: { name: "en" } },
      { flavor_text: "Quand plusieurs", language: { name: "fr" } },
      {
        flavor_text: "When several of\nthese POKéMON\fgather,  their electricity",
        language: { name: "en" },
      },
    ],
    evolution_chain: { url: "" },
  } satisfies PokemonSpecies;

  it("uses the latest English flavor text with line breaks removed", () => {
    expect(englishFlavorText(species)).toBe(
      "When several of these POKéMON gather, their electricity",
    );
  });

  it("uses the English genus", () => {
    expect(englishGenus(species)).toBe("Mouse Pokémon");
  });

  it("returns empty strings while species data is loading", () => {
    expect(englishFlavorText(undefined)).toBe("");
    expect(englishGenus(undefined)).toBe("");
  });
});
