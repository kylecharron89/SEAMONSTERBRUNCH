
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const brunchSpots = [
  {
    name: "Synonym",
    position: [43.2557, -79.8711],
    description: "Hipster heaven. Vegan-ish. Great coffee. Risk of running into your ex: high.",
    rating: 4.5,
  },
  {
    name: "The Cannon",
    position: [43.2553, -79.8434],
    description: "Waffle gods live here. Cozy, queer-friendly, chaotic good energy.",
    rating: 4.7,
  },
  {
    name: "Saint James Espresso Bar & Eatery",
    position: [43.2569, -79.8715],
    description: "Tiny but mighty. For when you want your eggs with existential dread.",
    rating: 4.6,
  },
];

export default function BrunchMap() {
  const [visited, setVisited] = useState([]);
  const [comments, setComments] = useState({});

  const toggleVisited = (name) => {
    setVisited((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleCommentChange = (name, value) => {
    setComments((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-screen">
      <MapContainer center={[43.2557, -79.8711]} zoom={13} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {brunchSpots.map((spot) => (
          <Marker key={spot.name} position={spot.position}>
            <Popup>
              <div className="text-sm">
                <h2 className="font-bold text-base">{spot.name}</h2>
                <p>{spot.description}</p>
                <p className="italic">Rating: {spot.rating}/5</p>
                <textarea
                  placeholder="Your hot take..."
                  value={comments[spot.name] || ""}
                  onChange={(e) => handleCommentChange(spot.name, e.target.value)}
                  className="w-full p-1 text-xs border mt-2"
                />
                <button
                  onClick={() => toggleVisited(spot.name)}
                  className="mt-2 bg-purple-600 text-white px-2 py-1 text-xs rounded"
                >
                  {visited.includes(spot.name) ? "Uncross it" : "Cross this off (brunch'd)"}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
