import { profileGetCountries } from "@/features/profile/service/profile-countries.service";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";

export type Country = {
  id: number;
  country: string;
  upload_document: string;
};

export type CitySuggestion = {
  name: string;
  state?: string;
  country?: string;
};

export const useLocationDataHook = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [isFetchingCities, setIsFetchingCities] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastQuery = useRef<string>("");
  const abortController = useRef<AbortController | null>(null);
  const isMounted = useRef(true);
  const isProcessing = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const fetchCountries = async () => {
      try {
        const res = await profileGetCountries();
        if (res?.status && Array.isArray(res?.data) && isMounted.current) {
          setCountries(res.data);
        }
      } catch (error) {
        console.log("Error fetching countries:", error);
        if (isMounted.current) {
          Alert.alert("Error", "Failed to load countries.");
        }
      }
    };
    fetchCountries();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchCitySuggestions = useCallback(
    (query: string, countryName: string) => {
      // Prevent multiple simultaneous processes
      if (isProcessing.current) {
        return;
      }

      // Clear previous debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Cancel previous fetch request
      if (abortController.current) {
        abortController.current.abort();
      }

      // Reset state if query is invalid
      if (!countryName || query.trim().length < 2) {
        setCitySuggestions([]);
        setShowCitySuggestions(false);
        setIsFetchingCities(false);
        lastQuery.current = "";
        isProcessing.current = false;
        return;
      }

      const currentQuery = `${query}-${countryName}`;

      // Avoid duplicate requests
      if (currentQuery === lastQuery.current) {
        return;
      }

      debounceTimer.current = setTimeout(async () => {
        if (!isMounted.current || isProcessing.current) return;

        try {
          isProcessing.current = true;
          setIsFetchingCities(true);
          setShowCitySuggestions(true);
          lastQuery.current = currentQuery;

          // Create new abort controller for this request
          abortController.current = new AbortController();

          const fullQuery = `${query.trim()}, ${countryName}`;
          const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
            fullQuery
          )}&osm_tag=place:city&osm_tag=place:town&limit=10`;

          const response = await fetch(url, {
            signal: abortController.current.signal,
          });

          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();

          if (!isMounted.current) return;

          if (!data || !Array.isArray(data.features)) {
            console.warn("Invalid city API response:", data);
            setCitySuggestions([]);
            setShowCitySuggestions(false);
            return;
          }

          const cities = data.features
            .filter(
              (item: any) =>
                item?.properties?.name &&
                typeof item.properties.name === "string"
            )
            .map((item: any) => ({
              name: item.properties.name,
              state: item.properties.state || "",
              country: item.properties.country || "",
            }))
            .slice(0, 5);

          console.log("✅ Cities fetched:", cities.length);

          if (isMounted.current) {
            // Use setTimeout to batch state updates for New Architecture
            setTimeout(() => {
              if (isMounted.current) {
                setCitySuggestions(cities);
              }
            }, 0);
          }
        } catch (error: any) {
          if (!isMounted.current) return;

          // Ignore AbortError - it's expected when user types quickly
          if (error.name === "AbortError") {
            return;
          }

          console.error("❌ Error fetching cities:", error.message);
          setCitySuggestions([]);
          setShowCitySuggestions(false);
          console.warn("City fetch failed gracefully");
        } finally {
          if (isMounted.current) {
            // Batch state updates
            setTimeout(() => {
              if (isMounted.current) {
                setIsFetchingCities(false);
                isProcessing.current = false;
              }
            }, 0);
          } else {
            isProcessing.current = false;
          }
        }
      }, 600); // Increased debounce for New Architecture
    },
    [] // No dependencies - stable callback
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
      isProcessing.current = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  // Memoize suggestions to prevent unnecessary re-renders
  const memoizedSuggestions = useMemo(() => citySuggestions, [citySuggestions]);

  return {
    countries,
    citySuggestions: memoizedSuggestions,
    setCitySuggestions,
    fetchCitySuggestions,
    showCitySuggestions,
    isFetchingCities,
    setShowCitySuggestions,
    lastQuery,
  };
};
