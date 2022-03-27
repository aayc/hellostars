import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

type DarkSkyMapProps = {
  initialLocation: { lat: number; lng: number };
};

const containerStyle = {
  width: "1600px",
  height: "900px",
};

function DarkSkyMap(props: DarkSkyMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDB4VIrS37CZIgpA05l-x5KPR42eT8HDgM",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="min-w-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.initialLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(DarkSkyMap);
