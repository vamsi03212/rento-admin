import { AxiosError } from "axios";
import Toast, { ToastPosition } from "react-native-toast-message";

export const apiWrapper = async <T>(
  apiCall: () => Promise<{ data: T }>,
  options?: {
    toastPosition?: ToastPosition;
    showToast?: boolean;
  }
): Promise<{
  status: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}> => {
  const { toastPosition = "bottom", showToast = true } = options || {};

  try {
    const response = await apiCall();

    return { status: true, data: response.data };
  } catch (error: unknown) {
    let message = "Unexpected error occurred";
    let statusCode: number | undefined;

    if (error instanceof AxiosError) {
      message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      statusCode = error.response?.status;
    } else if (error instanceof Error) {
      message = error.message;
    }

    if (showToast) {
      Toast.show({
        type: "error",
        text1: message,
        position: toastPosition,
        visibilityTime: 2000,
      });
    }

    return { status: false, error: message, statusCode };
  }
};
