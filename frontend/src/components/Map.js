import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = {
  lat: 30.0444, // Replace with your desired latitude
  lng: 31.2357, // Replace with your desired longitude
};

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY_HERE" // Replace with your API key
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
