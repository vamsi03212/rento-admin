import { CheckCircle2, Clock, CreditCard, XCircle } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

const PaymentHistory = () => {
  const payments = [
    {
      id: 1,
      title: "Monthly Rent",
      amount: "₹6,500",
      status: "Paid",
      date: "2025-10-02",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: "₹850",
      status: "Pending",
      date: "2025-10-28",
    },
    {
      id: 3,
      title: "Water Bill",
      amount: "₹300",
      status: "Failed",
      date: "2025-09-14",
    },
    {
      id: 4,
      title: "Maintenance Fee",
      amount: "₹500",
      status: "Paid",
      date: "2025-09-07",
    },
    {
      id: 5,
      title: "Security Deposit",
      amount: "₹2000",
      status: "Paid",
      date: "2025-08-13",
    },
  ];

  const formatMonth = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const groupedByMonth: Record<string, typeof payments> = {};
  payments.forEach((payment) => {
    const month = formatMonth(payment.date);
    if (!groupedByMonth[month]) groupedByMonth[month] = [];
    groupedByMonth[month].push(payment);
  });

  const sortedMonths = Object.keys(groupedByMonth).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <View className="bg-green-100 px-2 py-1 rounded-lg">
            <Text className="text-green-600 text-[10px]">Paid</Text>
          </View>
        );
      case "Pending":
        return (
          <View className="bg-yellow-100 px-2 py-1 rounded-lg">
            <Text className="text-yellow-600 text-[10px]">Pending</Text>
          </View>
        );
      case "Failed":
        return (
          <View className="bg-red-100 px-2 py-1 rounded-lg">
            <Text className="text-red-600 text-[10px]">Failed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle2 color="#16A34A" size={20} />;
      case "Pending":
        return <Clock color="#CA8A04" size={20} />;
      case "Failed":
        return <XCircle color="#DC2626" size={20} />;
      default:
        return <CreditCard color="#6B7280" size={20} />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <Text
        className="text-xl text-gray-900 mb-2"
        style={{ fontFamily: "poppins-semi-bold" }}
      >
        Payment History
      </Text>

      <Text
        className="text-xs text-gray-500 mb-4"
        style={{ fontFamily: "poppins-regular" }}
      >
        Your past transactions grouped by month
      </Text>

      {/* Filters (optional UI) */}
      {/* <View className="flex-row gap-2 mb-3">
        {["All", "Paid", "Pending", "Failed"].map((filter) => (
          <Pressable
            key={filter}
            className="px-3 py-1 bg-gray-100 rounded-full"
          >
            <Text className="text-xs text-gray-700">{filter}</Text>
          </Pressable>
        ))}
      </View> */}

      {/* ✅ MONTH LOOPS */}
      {sortedMonths.map((month) => (
        <View key={month} className="mb-4">
          {/* Month Heading */}
          <Text
            className="text-xs text-gray-400 mb-2"
            style={{ fontFamily: "poppins-medium" }}
          >
            {month}
          </Text>

          {groupedByMonth[month].map((item) => (
            <View
              key={item.id}
              className="bg-white border border-gray-100 rounded-xl p-4 mb-3 flex-row items-center gap-3 shadow-xs"
            >
              {getStatusIcon(item.status)}

              <View className="flex-1">
                <Text
                  className="text-sm text-gray-800"
                  style={{ fontFamily: "poppins-medium" }}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "poppins-regular" }}
                >
                  {item.date}
                </Text>
              </View>

              <View className="items-end gap-1">
                <Text
                  className="text-sm text-gray-900"
                  style={{ fontFamily: "poppins-semi-bold" }}
                >
                  {item.amount}
                </Text>
                {getStatusBadge(item.status)}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default PaymentHistory;
