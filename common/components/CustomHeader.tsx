import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { Menu } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  title?: string; // optional static title
  children?: React.ReactNode; // dynamic content after menu
};

export function CustomHeader({ title, children }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Menu size={26} />
        </Pressable>

        {/* Title or Children */}
        <View style={styles.content}>
          {children ? children : <Text style={styles.title}>{title}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    paddingTop: 0,
    // Height including menu icon
    height: 80,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    flex: 1,
  },

  content: {
    marginLeft: 10,
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
