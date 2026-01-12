"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/map")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Laddar...</p>;
  }
  const listItems = [];
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    listItems.push(
      <li key={location.id}>{location.name} – {location.lat}, {location.lng}</li>
    );
  }

  return (
    <div>
      <h1>Platser</h1>
      <p>Datan kommer från min API-route</p>

      <ul>
        {listItems}
      </ul>
    </div>
  );
}
