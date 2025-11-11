import React from "react";
import { Text, View } from "react-native";

// Define the type for each dashboard item
interface DashboardItem {
  // id: string;
  title: string;
  value: number;
  // icon: React.ElementType;
  // subText: string;
}

interface DashboardCardProps {
  item: DashboardItem;
}
const colors = [
  "#FFEBEE", // light red/pink
  "#E3F2FD", // light blue
  "#FFF8E1", // light yellow
  "#E8F5E9", // light green
  "#F3E5F5", // light purple
  "#FFE0B2", // light orange
  "#E0F2F1", // teal-ish
  "#FCE4EC", // soft pink
];

export const DashboardCount: React.FC<DashboardCardProps> = ({ item }) => {
  // const Icon = item.icon;
  return (
    <View
      className="  bg-gray-100 rounded-2xl p-5 mb-4"
      // style={{ backgroundColor: colors[parseInt(item.id) % colors.length] }}
    >
      {/* <Icon size={30} color={"#932537"} /> */}
      <Text
        style={{ fontFamily: "poppins-regular" }}
        numberOfLines={1}
        className="text-[11px] mt-1"
      >
        {item.title}
      </Text>
      <Text
        style={{ fontFamily: "poppins-semi-bold" }}
        className="text-4xl text-primary-100 mt-1"
      >
        {item.value}
      </Text>
      <Text className="text-[9px] pl-2 -mt-2">Houses</Text>
    </View>
  );
};

// export const dashboardData: DashboardItem[] = [
//   {
//     id: "1",
//     title: "Posted Properties",
//     value: 65,
//     icon: House,
//     subText: "houses",
//   },
//   {
//     id: "2",
//     title: "Rental Amount",
//     value: 30,
//     icon: DollarSign,
//     subText: "collected",
//   },
//   {
//     id: "3",
//     title: "Tenant Slot",
//     value: 12,
//     icon: Calendar,
//     subText: "booked",
//   },
//   {
//     id: "4",
//     title: "Service Booking",
//     value: 7,
//     icon: Settings,
//     subText: "scheduled",
//   },
// ];
