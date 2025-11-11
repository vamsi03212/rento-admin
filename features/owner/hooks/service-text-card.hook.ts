import { useState } from "react";
import { ServiceType } from "../types/service-provided.types";

export const useServiceTextCardHook = () => {
  const [displayBottom, setDisplayBottom] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState("");

  const handelSelectService = (service: ServiceType) => {
    setDisplayBottom(true);
    setServiceType(service.service_name);
    setPrice(service.price);
  };

  return {
    displayBottom,
    handelSelectService,
    setDisplayBottom,
    serviceType,
    price,
  };
};
