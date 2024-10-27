import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import "firebase/firestore";
import "leaflet/dist/leaflet.css";
import customIcon from "./Marker";

const initialCenter: LatLngExpression = [0.0236, 37.9062];
const initialZoom = 6;

interface Props {
  agents: any[];
}

const RealTimeMap: React.FC<Props> = ({ agents }) => {
  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {agents.map((agent) => (
        <Marker
          key={agent?.id}
          position={
            agent.location.latitude
              ? [agent?.location?.latitude, agent?.location?.longitude]
              : initialCenter
          }
          icon={customIcon(agent?.userName || "")}
        />
      ))}
    </MapContainer>
  );
};

export default RealTimeMap;
