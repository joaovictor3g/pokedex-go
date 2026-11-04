import type { ComponentType } from "react";
import { useColorScheme } from "react-native";
import NativeSegmentedControl, {
  type SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control";
import { haptics } from "@/lib/haptics";

// The package's class typings predate React 19's JSX types.
const Control = NativeSegmentedControl as unknown as ComponentType<SegmentedControlProps>;

interface Props {
  values: readonly string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

// UISegmentedControl on iOS (Liquid Glass on iOS 26), a styled equivalent on Android.
export function SegmentedControl({ values, selectedIndex, onChange }: Props) {
  const scheme = useColorScheme();
  return (
    <Control
      values={[...values]}
      selectedIndex={selectedIndex}
      onChange={(event) => {
        haptics.select();
        onChange(event.nativeEvent.selectedSegmentIndex);
      }}
      appearance={scheme === "dark" ? "dark" : "light"}
      style={{ height: 36 }}
    />
  );
}
