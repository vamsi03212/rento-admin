import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export default function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(
        Boolean(state.isConnected && state.isInternetReachable !== false)
      );
    });

    NetInfo.fetch().then((s) => {
      setIsConnected(Boolean(s.isConnected && s.isInternetReachable !== false));
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
}
