import { Stack } from "expo-router";
import { useLargeTitleOptions } from "@/ui/useLargeTitleOptions";

export default function TabStackLayout() {
  return <Stack screenOptions={useLargeTitleOptions()} />;
}
