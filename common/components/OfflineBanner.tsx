import useNetworkStatus from "@/lib/useNetworkStatus";
import { MotiText, MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OfflineBanner() {
  const isConnected = useNetworkStatus();
  const insets = useSafeAreaInsets();

  if (isConnected) return null;

  return (
    <MotiView
      from={{ translateY: -60, opacity: 0 }}
      animate={{ translateY: insets.top + 12, opacity: 1 }}
      exit={{ translateY: -60, opacity: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={[styles.container, { top: insets.top + 12 }]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>⚠️</Text>
      </View>

      <View style={{ flex: 1 }}>
        <MotiText
          from={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 100 }}
          style={styles.title}
        >
          You’re offline
        </MotiText>
        <Text style={styles.sub}>Check your connection and try again.</Text>
      </View>

      <Pressable style={styles.retryBtn} onPress={() => {}}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b6b",
    borderRadius: 12,
    padding: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 9999,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  icon: { fontSize: 18 },
  title: { color: "white", fontSize: 15, fontWeight: "700" },
  sub: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 4 },
  retryBtn: {
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 8,
  },
  retryText: { color: "white", fontWeight: "700" },
});
