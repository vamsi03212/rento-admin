import { AlertTriangle, Bolt, Calendar, CreditCard } from "lucide-react-native";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import NotificationCard from "@/features/notifications/components/NotificationCard";
import { useNotificationHook } from "@/features/notifications/hooks/notification.hook";

const Notification = () => {
  const {
    notifications,
    loading,
    error,
    isPaginating,
    hasMore,
    loadMore,
    refresh,
  } = useNotificationHook();

  // ✅ Helper to format date
  const formatDate = (dateStr: string) => new Date(dateStr).toDateString();

  const today = new Date().toDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toDateString();

  // ✅ Group notifications by date
  const groupedNotifications = useMemo(() => {
    const groups: Record<string, any[]> = {};
    notifications.forEach((n) => {
      const d = formatDate(n.createdAt);
      if (!groups[d]) groups[d] = [];
      groups[d].push(n);
    });

    const todayList = groups[today] || [];
    const yesterdayList = groups[yesterday] || [];

    const older = Object.keys(groups)
      .filter((d) => d !== today && d !== yesterday)
      .reduce((acc, d) => {
        acc[d] = groups[d];
        return acc;
      }, {} as Record<string, any[]>);

    return { todayList, yesterdayList, older };
  }, [notifications]);

  // ✅ Icon selection by type
  const iconByType = (type: string) => {
    switch (type) {
      case "service":
        return <Bolt color="#F59E0B" />;
      case "payment":
        return <CreditCard color="#16A34A" />;
      case "booking":
        return <Calendar color="#2563EB" />;
      case "alert":
        return <AlertTriangle color="#DC2626" />;
      default:
        return <Bolt color="#6B7280" />;
    }
  };

  // ✅ Flatten all grouped sections for FlatList rendering
  const listData = useMemo(() => {
    const sections: any[] = [];

    if (groupedNotifications.todayList.length > 0)
      sections.push({
        title: "Today",
        data: groupedNotifications.todayList,
      });

    if (groupedNotifications.yesterdayList.length > 0)
      sections.push({
        title: "Yesterday",
        data: groupedNotifications.yesterdayList,
      });

    Object.keys(groupedNotifications.older).forEach((date) => {
      sections.push({
        title: date,
        data: groupedNotifications.older[date],
      });
    });

    return sections;
  }, [groupedNotifications]);

  // ✅ Render Section Headers + Cards
  const renderItem = ({ item, index, section }: any) => (
    <NotificationCard
      key={`${item.id}-${index}`}
      title={item.title}
      message={item.body}
      status={item.type}
      icon={iconByType(item.type)}
    />
  );

  return (
    <View className="flex-1 bg-white p-3">
      <DataWrapper
        loading={loading && notifications.length === 0}
        error={error}
        emptyMessage="No notifications found."
      >
        {notifications && notifications.length > 0 ? (
          <FlatList
            data={listData}
            keyExtractor={(item, index) =>
              `${item.title}-${index}-${item.createdAt}`
            }
            renderItem={({ item }) => (
              <View>
                <Text className="text-sm text-gray-400 mt-4 mb-2 font-medium">
                  {item.title}
                </Text>

                {item.data.map((notif: any) => (
                  <NotificationCard
                    key={notif.id}
                    title={notif.title}
                    message={notif.body}
                    status={notif.type}
                    icon={iconByType(notif.type)}
                  />
                ))}
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              if (isPaginating)
                return (
                  <ActivityIndicator
                    size="large"
                    color="#932537"
                    className="my-4"
                  />
                );

              if (!hasMore && notifications.length > 0)
                return (
                  <Text className="text-center text-gray-500 my-7">
                    You’ve reached the end 🎉
                  </Text>
                );

              return null;
            }}
          />
        ) : (
          <EmptyWishlist txt="No notifications found." isDisBtn={false} />
        )}
      </DataWrapper>
    </View>
  );
};

export default Notification;

// import NotificationCard from "@/features/notifications/components/NotificationCard";
// import { useNotificationHook } from "@/features/notifications/hooks/notification.hook";
// import { AlertTriangle, Bolt, Calendar, CreditCard } from "lucide-react-native";
// import { ScrollView, Text, View } from "react-native";

// const Notification = () => {
//   useNotificationHook();

//   const notifications = [
//     {
//       id: 1,
//       title: "Maintenance Request",
//       message: "Plumbing repair at Unit 4B completed.",
//       status: "Service Completed",
//       type: "service",
//       date: "2025-10-27T10:15:00",
//     },
//     {
//       id: 2,
//       title: "Payment Received",
//       message: "Rent payment of ₹6,500 received.",
//       status: "Payment Successful",
//       type: "payment",
//       date: "2025-10-27T16:30:00",
//     },
//     {
//       id: 3,
//       title: "Booking Confirmed",
//       message: "Electrician will visit tomorrow 11 AM.",
//       status: "Appointment Scheduled",
//       type: "booking",
//       date: "2025-10-26T08:05:00",
//     },
//     {
//       id: 4,
//       title: "Urgent Notice",
//       message: "Water supply will be off today 2–5PM.",
//       status: "Important",
//       type: "alert",
//       date: "2025-10-24T12:00:00",
//     },
//     {
//       id: 5,
//       title: "Urgent Notice",
//       message: "Maintenance required soon.",
//       status: "Important",
//       type: "alert",
//       date: "2025-10-14T12:00:00",
//     },
//   ];

//   // format helper
//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toDateString();
//   };

//   const today = new Date().toDateString();
//   const yesterdayDate = new Date();
//   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
//   const yesterday = yesterdayDate.toDateString();

//   const iconByType = (type: string) => {
//     switch (type) {
//       case "service":
//         return <Bolt color="#F59E0B" />;
//       case "payment":
//         return <CreditCard color="#16A34A" />;
//       case "booking":
//         return <Calendar color="#2563EB" />;
//       case "alert":
//         return <AlertTriangle color="#DC2626" />;
//       default:
//         return <Bolt color="#6B7280" />;
//     }
//   };

//   const todayList = notifications.filter((n) => formatDate(n.date) === today);

//   const yesterdayList = notifications.filter(
//     (n) => formatDate(n.date) === yesterday
//   );

//   const olderList = notifications.filter(
//     (n) => formatDate(n.date) !== today && formatDate(n.date) !== yesterday
//   );

//   // group older by exact date
//   const groupedOlder: Record<string, any[]> = {};
//   olderList.forEach((n) => {
//     const d = formatDate(n.date);
//     if (!groupedOlder[d]) groupedOlder[d] = [];
//     groupedOlder[d].push(n);
//   });

//   return (
//     <ScrollView className="flex-1 bg-white p-4">
//       {/* TODAY */}
//       {todayList.length > 0 && (
//         <>
//           <Text className="text-sm text-gray-400 mb-2">Today</Text>
//           {todayList.map((item) => (
//             <NotificationCard
//               key={item.id}
//               title={item.title}
//               message={item.message}
//               status={item.status}
//               icon={iconByType(item.type)}
//             />
//           ))}
//         </>
//       )}

//       {/* YESTERDAY */}
//       {yesterdayList.length > 0 && (
//         <>
//           <Text className="text-sm text-gray-400 mt-4 mb-2">Yesterday</Text>
//           {yesterdayList.map((item) => (
//             <NotificationCard
//               key={item.id}
//               title={item.title}
//               message={item.message}
//               status={item.status}
//               icon={iconByType(item.type)}
//             />
//           ))}
//         </>
//       )}

//       {/* OLDER — grouped dynamically */}
//       {Object.keys(groupedOlder).map((dateKey) => (
//         <View key={dateKey}>
//           <Text className="text-sm text-gray-400 mt-4 mb-2">{dateKey}</Text>

//           {groupedOlder[dateKey].map((item) => (
//             <NotificationCard
//               key={item.id}
//               title={item.title}
//               message={item.message}
//               status={item.status}
//               icon={iconByType(item.type)}
//             />
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default Notification;
