import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import React from "react";

import "leaflet/dist/leaflet.css";
// import "leaflet-geosearch/dist/geosearch.css";

const defaultMarker = new L.Icon({
  iconUrl: "/icons/marker.svg",
  iconRetinaUrl: "/icons/marker.svg",
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

const highlightedMarker = new L.Icon({
  iconUrl: "/icons/highlighted-marker.svg",
  iconRetinaUrl: "/icons/highlighted-marker.svg",
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

interface ChangeViewProps {
  markers: MarkerType[];
}

const calculateBoundries = (markers: MarkerType[]) => {
  // console.log("markers", markers);
  if (!markers[0]) {
    return { northBoundry: 0, southBoundry: 0, westBoundy: 0, eastBoundry: 0 };
  }

  let northBoundry = markers[0].latitude;
  let southBoundry = markers[0].latitude;
  let westBoundy = markers[0].longitude;
  let eastBoundry = markers[0].longitude;

  markers.slice(1).forEach((m) => {
    if (m.latitude > northBoundry) {
      northBoundry = m.latitude;
    }
    if (m.latitude < southBoundry) {
      southBoundry = m.latitude;
    }
    if (m.longitude > eastBoundry) {
      westBoundy = m.longitude;
    }
    if (m.longitude < westBoundy) {
      eastBoundry = m.longitude;
    }
  });

  return {
    northBoundry,
    southBoundry,
    eastBoundry,
    westBoundy,
  };
};

const MemoizedChangeView = React.memo(function ChangeView({
  markers,
}: ChangeViewProps) {
  // console.log("RENDER ChangeView");
  const map = useMap();
  if (!markers.length) {
    map.setView([0, 0], 1);
  } else {
    const boundries = calculateBoundries(markers);
    const centerPoint = calculateCenterPoint(boundries);
    const zoomRatio = calculateZoomLevel(boundries);

    // console.log(boundries, centerPoint, zoomRatio);

    map.setView(centerPoint, zoomRatio);
  }

  return null;
});

type MarkerType = {
  id: string;
  longitude: number;
  latitude: number;
};

interface MapProps {
  focusedMarkerId?: string;
  markers: MarkerType[];
}

type BoundariesType = {
  northBoundry: number;
  southBoundry: number;
  eastBoundry: number;
  westBoundy: number;
};

const calculateCenterPoint = (boundaries: BoundariesType): LatLngTuple => {
  return [
    (boundaries.northBoundry + boundaries.southBoundry) / 2,
    (boundaries.westBoundy + boundaries.eastBoundry) / 2,
  ];
};

const calculateZoomLevel = (boundaries: BoundariesType) => {
  const ZoomRatio =
    Math.abs(boundaries.northBoundry - boundaries.southBoundry) +
    Math.abs(boundaries.eastBoundry - boundaries.westBoundy);

  if (ZoomRatio < 0.05) {
    return 16;
  }
  if (ZoomRatio < 0.1) {
    return 12;
  }
  if (ZoomRatio < 1) {
    return 10;
  }
  return 1;
};

const Map = ({ markers, focusedMarkerId }: MapProps) => {
  // const centerTuple = [centerLatitude, centerLongitude] as LatLngTuple;
  console.log("RENDER MAP");

  return (
    <MapContainer
      style={{ height: "300px" }}
      dragging={false}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker
          position={[m.latitude, m.longitude]}
          icon={m.id === focusedMarkerId ? highlightedMarker : defaultMarker}
          // icon={defaultMarker}
          key={m.id}
        />
      ))}

      <MemoizedChangeView markers={markers} />
    </MapContainer>
  );
};

export default React.memo(Map);
