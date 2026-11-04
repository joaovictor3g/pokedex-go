import { type StyleProp } from "react-native";
import { Image, type ImageStyle } from "expo-image";
import { artworkUrl } from "../logic";

interface ArtworkProps {
  id: number;
  size: number;
  style?: StyleProp<ImageStyle>;
}

export function Artwork({ id, size, style }: ArtworkProps) {
  return (
    <Image
      source={artworkUrl(id)}
      style={[{ width: size, height: size }, style]}
      contentFit="contain"
      transition={200}
      cachePolicy="memory-disk"
      recyclingKey={String(id)}
      accessibilityIgnoresInvertColors
    />
  );
}
