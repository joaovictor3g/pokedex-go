# Pokédex Go

A Pokédex for iOS and Android built with Expo. Browse all 1,025 Pokémon from
[PokeAPI](https://pokeapi.co/docs/v2), save favorites, and level up your trainer by completing
discovery challenges. On iOS 26 it uses Apple's Liquid Glass throughout.

Started in 2021 as a UI clone of Arlley Gomes's
[Pokédex concept on Behance](https://www.behance.net/gallery/95262057/POKEDEX), and rebuilt in
2026 on Expo SDK 58.

## ✨ Features

- **Pokédex:** all 1,025 Pokémon in a grid, searchable by name or number (`pika`, `25`, `#025`),
  with a filter for each of the 18 types.
- **Details:** description, height, weight, abilities, base stats and the full evolution chain,
  including branching ones like Eevee's. Tap any stage to jump to it.
- **Pokémon of the day:** the same pick for everyone on a given day.
- **Favorites:** tap the heart, swipe left to remove, or long-press any Pokémon (iOS) for a
  preview and quick actions.
- **Trainer progress:** opening a Pokémon counts it as seen; challenges ("see 4 Fire types")
  pay XP once, and levels follow the original app's curve.
- **Works offline:** PokeAPI responses are cached on the device for a week.
- **Light and dark mode**, following the system setting.

## 🪟 Liquid Glass

On iOS 26 the app uses the system's own glass components wherever it can:

| Where                              | How                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| Tab bar                            | `expo-router/native-tabs`, the real `UITabBar` (shrinks on scroll)                              |
| Headers, search, segmented control | native stack headers, `headerSearchBarOptions`, `UISegmentedControl`                            |
| Edit trainer sheet                 | `formSheet` with a transparent background                                                       |
| Floating controls and panels       | `GlassView` from [`expo-glass-effect`](https://docs.expo.dev/versions/latest/sdk/glass-effect/) |

`src/ui/Glass.tsx` falls back to a blur on older iOS and a translucent fill on Android.

## 🚀 Tech

- [Expo SDK 58](https://expo.dev/) (React Native 0.88, React 19) with the
  [React Compiler](https://docs.expo.dev/guides/react-compiler/)
- [Expo Router](https://docs.expo.dev/router/introduction/) with typed routes
- [NativeWind v5](https://www.nativewind.dev/v5) + [Tailwind CSS v4](https://tailwindcss.com/),
  themed in `global.css`
- [TanStack Query](https://tanstack.com/query), persisted to AsyncStorage
- [FlashList](https://shopify.github.io/flash-list/), [expo-image](https://docs.expo.dev/versions/latest/sdk/image/),
  [SF Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/), haptics and a
  [Lottie](https://docs.expo.dev/versions/latest/sdk/lottie/) loader
- Jest, ESLint and Prettier

## ▶️ Getting started

Requires Node 22.13+, 24.3+ or 26+ (what Expo SDK 58 supports), [pnpm](https://pnpm.io/) and the [Expo Go](https://expo.dev/go) app on your
phone.

```sh
pnpm install
pnpm start        # scan the QR code with Expo Go
```

The Expo CLI on your computer and Expo Go on your phone must be signed in to the same Expo
account (`npx expo login`).

| Script           | What it does          |
| ---------------- | --------------------- |
| `pnpm start`     | Starts the dev server |
| `pnpm test`      | Runs the unit tests   |
| `pnpm lint`      | Runs ESLint           |
| `pnpm typecheck` | Runs TypeScript       |
| `pnpm format`    | Formats with Prettier |

## 🗂 Project structure

```
app/                      routes (Expo Router)
  (tabs)/                 native tab bar: (home), pokedex, favorites, profile
  pokemon/[id].tsx        Pokémon detail
  onboarding.tsx          first run, shown until a trainer is saved
  trainer.tsx             edit trainer sheet
src/
  features/
    pokemon/              PokeAPI queries, pure helpers, cards, stats, evolutions
    favorites/            favorites state
    progress/             challenges, XP and levels
    trainer/              trainer profile and form
  ui/                     shared primitives: Glass, Text, Icon, ProgressBar...
  theme/                  colors and the 18 Pokémon types
  lib/                    storage, haptics, formatting
```

Rules that don't need React (search matching, evolution chains, XP, challenges, colors) are
plain functions with tests in the `__tests__` folders next to them.

## ⚠️ Notes

- **NativeWind v5 is a release candidate.** It's pinned to the versions its install guide was
  tested with (`lightningcss` override in `pnpm-workspace.yaml`). `metro.config.js` also works
  around an RC bug: its `react-native` wrapper lacks `AssetRegistry` on React Native 0.88, which
  broke icon fonts, so libraries in `node_modules` get the real `react-native`.
- Pokémon descriptions are in English; PokeAPI has almost no Portuguese text. The rest of the
  app is in Portuguese.

## 🕰 The 2021 version

<div align="center">
    <img src="./assets/gifs/first-demo.gif" alt="The original 2021 version of the app" />
</div>

## 🙏 Credits

- UI concept: [Arlley Gomes](https://www.behance.net/gallery/95262057/POKEDEX)
- Data and artwork: [PokeAPI](https://pokeapi.co/)
- Contributors: João Victor, [LucasRobs](https://github.com/LucasRobs)

Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak and The Pokémon
Company. This is a fan project, not affiliated with or endorsed by them.
