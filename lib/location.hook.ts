import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Region } from "react-native-maps";

export const useLocationHook = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [fullAddress, setFullAddress] = useState<string>("");

  // Get user's current location and address
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      setRegion((prev) => ({ ...prev, latitude, longitude }));

      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocode.length > 0) {
        const place = geocode[0];
        const address = [
          place.name,
          place.street,
          place.subregion,
          place.city,
          place.region,
          place.postalCode,
          place.country,
        ]
          .filter(Boolean)
          .join(", ");
        setFullAddress(address);
      }
    })();
  }, []);

  const updateRegion = async (newRegion: Region) => {
    setRegion(newRegion);

    const geocode = await Location.reverseGeocodeAsync({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });

    if (geocode.length > 0) {
      const place = geocode[0];
      const address = [
        place.name,
        place.street,
        place.subregion,
        place.city,
        place.region,
        place.postalCode,
        place.country,
      ]
        .filter(Boolean)
        .join(", ");
      setFullAddress(address);
    }
  };

  return { region, setRegion: updateRegion, fullAddress };
};
