import { useState, useEffect } from "react";

type GeoLocation = {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
};

type GeoLocationResult = {
  location: GeoLocation;
  error: string | null;
  isLoading: boolean;
};

const useGeoLocation = (): GeoLocationResult => {
  const [location, setLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const requestLocation = () => {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude, accuracy } = position.coords;
          if (accuracy <= 10) {
            // to ensure accuracy within 10 meters
            setLocation({ latitude, longitude, accuracy });
          } else {
            setError("Could not get a sufficiently accurate location.");
          }
          setIsLoading(false);
        },
        (error: GeolocationPositionError) => {
          setError(error.message);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    requestLocation();
  }, []);

  return { location, error, isLoading };
};

export default useGeoLocation;
