import * as Haptics from "expo-haptics";

// Fire-and-forget; haptics are a nicety, so failures are ignored.
export const haptics = {
  tap: () => void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}),
  select: () => void Haptics.selectionAsync().catch(() => {}),
  success: () =>
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
};
