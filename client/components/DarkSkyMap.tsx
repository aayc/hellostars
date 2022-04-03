import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type DarkSkyMapProps = {
  initialLocation: { lat: number; lng: number };
  markers: MapMarker[];
};

type MapMarker = {
  title: string;
  description: string;
  lat: number;
  lng: number;
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
        {props.markers.map((marker) => (
          <Marker
            key={"" + marker.lat + marker.lng + marker.title}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export type { MapMarker };

export default React.memo(DarkSkyMap);
