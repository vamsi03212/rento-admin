import { CustomHeader } from "@/common/components/CustomHeader";
import HeaderAvathar from "@/common/components/HeaderAvathar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { NEXT_PUBLIC_ADMIN_URL } from "@/lib/url";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  BoomBox,
  Calendar,
  CirclePlus,
  ClipboardList,
  CreditCard,
  Home,
  Kayak,
  LifeBuoy,
  ScrollText,
  ShieldCheck,
} from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {/* Screens */}
      <Drawer.Screen
        name="index"
        options={{
          header: () => (
            <CustomHeader>
              <HeaderAvathar />
            </CustomHeader>
          ),
        }}
      />
      {/* owner properties */}
      <Drawer.Screen
        name="addpost"
        options={{ header: () => <CustomHeader title="Add Property" /> }}
      />
      <Drawer.Screen
        name="manager-property"
        options={{ header: () => <CustomHeader title="Manager Property" /> }}
      />

      <Drawer.Screen
        name="enquiry"
        options={{ header: () => <CustomHeader title="Enquiry" /> }}
      />
      <Drawer.Screen
        name="service-bookings"
        options={{ header: () => <CustomHeader title="Service Bookings" /> }}
      />

      <Drawer.Screen
        name="tenant-details"
        options={{ header: () => <CustomHeader title="Service Bookings" /> }}
      />

      {/* common */}
      <Drawer.Screen
        name="notification"
        options={{ header: () => <CustomHeader title="Notification" /> }}
      />
      <Drawer.Screen
        name="payment-history"
        options={{ header: () => <CustomHeader title="Payment History" /> }}
      />
      <Drawer.Screen
        name="support"
        options={{ header: () => <CustomHeader title="Support" /> }}
      />
      <Drawer.Screen
        name="terms-conditions"
        options={{ header: () => <CustomHeader title="Terms & Conditions" /> }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          header: () => <CustomHeader title="Privacy Policy" />,
        }}
      />
      {/* agent */}
      <Drawer.Screen
        name="my-request"
        options={{
          header: () => <CustomHeader title="My Request" />,
        }}
      />
      <Drawer.Screen
        name="proof-of-visit"
        options={{
          header: () => <CustomHeader title="Proof Of Visit" />,
        }}
      />
      <Drawer.Screen
        name="agent-enquiry"
        options={{
          header: () => <CustomHeader title="Enquiry" />,
        }}
      />
    </Drawer>
  );
}

const CustomDrawer = (props: any) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const currentRoute = props.state?.routeNames[props.state.index];

  // 🧠 Role-based drawer items
  const commonItems = [
    { label: "Notification", icon: CreditCard, route: "notification" },
    { label: "Payment History", icon: CreditCard, route: "payment-history" },
    { label: "Support", icon: LifeBuoy, route: "support" },
  ];

  const ownerItems = [
    { label: "Add Property", icon: CirclePlus, route: "addpost" },
    {
      label: "Manage Property",
      icon: ClipboardList,
      route: "manager-property",
    },
    { label: "Enquiry", icon: Kayak, route: "enquiry" },
    { label: "Service Booking", icon: Calendar, route: "service-bookings" },
    {
      label: "Tenant Details",
      icon: Calendar,
      route: "tenant-details",
    },
  ];

  const agentItems = [
    { label: "My Request", icon: BoomBox, route: "my-request" },
    // { label: "Service Booking", icon: Calendar, route: "service-booking" },
    { label: "My Enquiry", icon: ClipboardList, route: "agent-enquiry" },
    { label: "Proof of Visit", icon: ClipboardList, route: "proof-of-visit" },
  ];

  const bottomItems = [
    {
      label: "Terms & Conditions",
      icon: ScrollText,
      route: "terms-conditions",
    },
    { label: "Privacy Policy", icon: ShieldCheck, route: "privacy-policy" },
  ];

  const roleItems =
    user?.role === "owner"
      ? [
          { label: "Home", icon: Home, route: "index" },
          ...ownerItems,
          ...commonItems,
        ]
      : [
          { label: "Home", icon: Home, route: "index" },
          ...agentItems,
          ...commonItems,
        ];

  const handleNavigation = () => {
    if (user) {
      router.push("/ProfileScreen");
    } else {
      router.push("/ProfileScreen");
    }
  };

  return (
    <View style={styles.container}>
      {/* Drawer Header */}
      <Pressable style={styles.header} onPress={handleNavigation}>
        <Image
          source={{
            uri:
              `${NEXT_PUBLIC_ADMIN_URL}${user?.upload_document}` ||
              "https://placekitten.com/100/100",
          }}
          style={styles.avatar}
        />
        {user ? (
          <>
            <Text style={styles.name}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.email}>{user.role?.toUpperCase()}</Text>
          </>
        ) : (
          <Pressable onPress={() => router.push("/(auth)/login-screen")}>
            <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
          </Pressable>
        )}
      </Pressable>

      {/* Scrollable Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollArea}
      >
        {roleItems.map((item, index) => {
          const isActive = currentRoute === item.route;
          return (
            <DrawerItem
              key={index}
              label={() => (
                <Text
                  style={[
                    styles.itemLabel,
                    {
                      color: isActive ? "#932537" : "#333",
                      fontWeight: isActive ? "bold" : "normal",
                    },
                  ]}
                >
                  {item.label}
                </Text>
              )}
              onPress={() => props.navigation.navigate(item.route)}
              icon={() => (
                <item.icon size={22} color={isActive ? "#932537" : "#555"} />
              )}
              style={[
                styles.drawerItem,
                isActive && { backgroundColor: "#fae8eb" },
              ]}
            />
          );
        })}

        <View style={styles.divider} />

        {bottomItems.map((item, index) => {
          const isActive = currentRoute === item.route;
          return (
            <DrawerItem
              key={index}
              label={() => (
                <Text
                  style={[
                    styles.itemLabel,
                    {
                      color: isActive ? "#932537" : "#555",
                      fontWeight: isActive ? "bold" : "normal",
                    },
                  ]}
                >
                  {item.label}
                </Text>
              )}
              onPress={() => props.navigation.navigate(item.route)}
              icon={() => (
                <item.icon size={22} color={isActive ? "#932537" : "#555"} />
              )}
              style={[
                styles.drawerItem,
                isActive && { backgroundColor: "#fae8eb" },
              ]}
            />
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#932537",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 8,
  },
  name: { color: "white", fontSize: 20, fontWeight: "bold" },
  email: { color: "white", fontSize: 14 },
  scrollArea: { paddingTop: 10, paddingBottom: 40 },
  drawerItem: { borderRadius: 10, marginHorizontal: 10 },
  itemLabel: { fontSize: 16 },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
