"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [update, setUpdate] = useState(false)

  async function fetchMapData() {
    fetch("/api/map")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMapData()
  }, [update])

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch("/api/map", {
      method: "POST",
      body: JSON.stringify({ name, lat, lng }),
    })
    setUpdate(!update)
  }
  if (loading) {
    return <p>Laddar...</p>
  }
  const listItems = []
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i]
    listItems.push(
      <li key={location.id}>
        {location.name} – {location.lat}, {location.lng}
      </li>
    )
  }
  return (
    <div>
      <h1>Platser</h1>
      <p>Datan kommer från min API-route</p>
      <ul>{listItems}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="number" onChange={(e) => setLat(Number(e.target.value))} />
        <input type="number" onChange={(e) => setLng(Number(e.target.value))} />
        <button>Send</button>
      </form>
    </div>
  )
}
