import L from "leaflet";

import "../styles/marker.css"; // Custom CSS for styling the custom icon

const customIcon = (name: string) => {
  return L.divIcon({
    className: "custom-marker-icon", // Custom class for styling
    html: `
      <div class="marker-label">${name}</div>
      <div>
      <span class="anticon anticon-environment"><svg viewBox="64 64 896 896" focusable="false" data-icon="environment" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M864 464c0 212.1-270.8 427.3-298.5 448.7-4.3 3.4-9.8 5.3-15.5 5.3s-11.2-1.8-15.5-5.3C405 891.3 134 676.1 134 464c0-198.2 166.4-360 372-360s358 161.8 358 360zM512 172c-156.5 0-284 126-284 284 0 136.6 160.5 311.2 284 408.3 123.5-97.1 284-271.7 284-408.3 0-158-127.5-284-284-284zm0 96a96 96 0 1 0 0 192 96 96 0 0 0 0-192z"></path></svg></span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export default customIcon;
