import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const sampleData = [
  {
    property: {
      type: "Modern Villa",
      owner_name: "John Dee",
      address: "Jubilee Hills",
      rent_amount: "10,000",
      bedrooms: 2,
      bathrooms: 2,
      square_footage: "2300 sq ft",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    },
    tenant: {
      full_name: "John Dee",
      phone_number: "98765431210",
      email: "johndee@gmail.com",
      profession: "Software Engineer",
      permanent_address: "1-589, Jubilee Hills, Hyderabad",
      father_name: "John",
      mother_name: "Jhonie",
      date_of_birth: "12-08-1999",
    },
  },
  {
    property: {
      type: "Luxury Apartment",
      owner_name: "Sarah Smith",
      address: "Banjara Hills",
      rent_amount: "25,000",
      bedrooms: 3,
      bathrooms: 3,
      square_footage: "1800 sq ft",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    },
    tenant: {
      full_name: "Michael Johnson",
      phone_number: "9876547890",
      email: "michael.johnson@example.com",
      profession: "Data Scientist",
      permanent_address: "12-45, Banjara Hills, Hyderabad",
      father_name: "David",
      mother_name: "Sophia",
      date_of_birth: "05-10-1990",
    },
  },
];

const TenantDetails = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {sampleData.map((item, index) => (
        <View
          key={index}
          className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden border border-gray-100"
        >
          {/* Property Image */}
          <Image
            source={{ uri: item.property.image }}
            className="w-full h-48"
            resizeMode="cover"
          />

          {/* Property Details */}
          <View className="p-4 border-b border-gray-100">
            <Text
              style={{ fontFamily: "poppins-semi-bold" }}
              className="text-lg font-semibold text-gray-900 mb-1"
            >
              {item.property.type}
            </Text>
            <Text
              className="text-gray-500 mb-2"
              style={{ fontFamily: "poppins-medium" }}
            >
              {item.property.address}
            </Text>

            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-700 font-medium">
                Rent: ₹{item.property.rent_amount}
              </Text>
              <Text className="text-gray-700 font-medium">
                {item.property.bedrooms}BHK | {item.property.bathrooms} Bath
              </Text>
            </View>

            <Text
              className="text-gray-500 mt-1"
              style={{ fontFamily: "poppins-medium" }}
            >
              Size: {item.property.square_footage}
            </Text>
          </View>

          {/* Tenant Details */}
          <View className="p-4">
            <Text
              style={{ fontFamily: "poppins-semi-bold" }}
              className="text-base font-semibold text-gray-900 mb-3"
            >
              Tenant Details
            </Text>

            <View className="bg-gray-50 rounded-xl p-4 shadow-sm">
              {/* Tenant Header */}
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 rounded-full bg-[#932537]/10 items-center justify-center mr-3">
                  <Text className="text-[#932537] text-lg font-semibold">
                    {item.tenant.full_name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-900 font-semibold text-base">
                    {item.tenant.full_name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {item.tenant.profession}
                  </Text>
                </View>
              </View>

              {/* Tenant Info Grid */}
              <View className="flex flex-col gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500 text-sm">📞 Phone</Text>
                  <Text className="text-gray-700 font-medium">
                    {item.tenant.phone_number}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray-500 text-sm">📧 Email</Text>
                  <Text className="text-gray-700 font-medium">
                    {item.tenant.email}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray-500 text-sm">🏠 Address</Text>
                  <Text
                    className="text-gray-700 font-medium text-right flex-1 ml-3"
                    numberOfLines={2}
                  >
                    {item.tenant.permanent_address}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray-500 text-sm">
                    🎂 Date of Birth
                  </Text>
                  <Text className="text-gray-700 font-medium">
                    {item.tenant.date_of_birth}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity className="mt-5 bg-[#932537] rounded-xl py-3 items-center">
              <Text className="text-white font-medium">View More Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default TenantDetails;
