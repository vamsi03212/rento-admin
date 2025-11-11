import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface AuthPickerProps {
  label?: string;
  selectedValue: string | string[];
  onValueChange: (value: string | string[]) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  error?: string;
  multiSelect?: boolean;
}

const AuthPicker: React.FC<AuthPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  options,
  error,
  multiSelect = false,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(
    multiSelect
      ? Array.isArray(selectedValue)
        ? selectedValue
        : []
      : selectedValue
  );
  const [items, setItems] = useState(options);

  // ✅ Update dropdown options when `options` prop changes
  useEffect(() => {
    if (Array.isArray(options) && options.length > 0) {
      setItems(options);
    }
  }, [options]);

  // 🔁 Sync external form value
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  // 🔁 Propagate changes to parent
  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <View style={{ width: "100%", zIndex: open ? 999 : 1 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        multiple={multiSelect}
        mode={multiSelect ? "BADGE" : "SIMPLE"} // ✅ badges appear inside input
        showBadgeDot={false}
        badgeTextStyle={{ color: "#fff", fontFamily: "poppins-medium" }}
        badgeStyle={{ backgroundColor: "#932537", borderRadius: 20 }}
        style={{
          backgroundColor: "#f5f5f5",
          borderColor: error ? "#f87171" : "transparent",
          height: 55,
          borderRadius: 10,
        }}
        dropDownContainerStyle={{
          borderColor: "#ddd",
          backgroundColor: "#fff",
          zIndex: 9999,
          elevation: 5,
        }}
        textStyle={{
          color: "#1F2937",
          fontFamily: "poppins-regular",
        }}
        placeholderStyle={{
          color: "#9ca3af",
        }}
        listMode="SCROLLVIEW"
      />

      {/* 🔴 Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: "#000",
    fontFamily: "poppins-medium",
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#932537",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedText: {
    color: "#fff",
    marginRight: 6,
    fontSize: 13,
    fontFamily: "poppins-medium",
  },
  errorText: {
    color: "#f87171",
    marginTop: 4,
    fontSize: 13,
  },
});

export default AuthPicker;
