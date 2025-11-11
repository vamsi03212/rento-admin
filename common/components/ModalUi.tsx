import React, { ReactNode } from "react";
import { Modal, Pressable, View, ViewStyle } from "react-native";

interface ModalUIProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  bgColor?: string;
  padding?: number;
  isBottomSheet?: boolean;
  height?: number;
}

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalUI: React.FC<ModalUIProps> = ({
  open,
  onClose,
  children,
  bgColor = "white",
  padding = 20,
  isBottomSheet = false,
  height,
}) => {
  const overlayStyle: ViewStyle = isBottomSheet
    ? { justifyContent: "flex-end", alignItems: "center" }
    : { justifyContent: "center", alignItems: "center" };

  const cardStyle: ViewStyle = isBottomSheet
    ? {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 20,
      }
    : { width: "85%", borderRadius: 10 };

  const containerStyle: ViewStyle = {
    backgroundColor: bgColor,
    padding,
    ...(height ? { height } : {}),
  };

  return (
    <Modal
      animationType={isBottomSheet ? "slide" : "fade"}
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50" style={overlayStyle}>
        {/* Background press to close */}
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        />
        {/* Modal content */}
        <View className="overflow-hidden" style={[containerStyle, cardStyle]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalUI;
