import { useState } from 'react'
import './App.css'
function App() {
  const [milesDriven, setMilesDriven] = useState(0)
  const [meatMeals, setMeatMeals] = useState(0)
  const [shortFlights, setShortFlights] = useState(0)
  const [longFlights, setLongFlights] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [footprint, setFootprint] = useState(null)

  const [flightHours, setFlightHours] = useState(0)

  const calculateFootprint = () => {
    const emissions = {
      car: Number(milesDriven) || 0 * 0.411,
      meat: Number(meatMeals) || 0 * 6,
      flights: Number(flightHours) || 0 * 134,
      electricity: Number(electricity) || 0 * 0.92,
    }
  
    const total =
      emissions.car +
      emissions.meat +
      emissions.flights + // ✅ use this instead
      emissions.electricity
  
    setFootprint(Math.round(total))
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>🌍 Carbon Footprint Estimator</h1>

      <label>
        🚗 Miles driven per week:
        <input
          type="number"
          min="0"
          value={milesDriven}
          onChange={(e) => setMilesDriven(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        🍔 Meat-based meals per week:
        <input
          type="number"
          min="0"
          value={meatMeals}
          onChange={(e) => setMeatMeals(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        ✈️ Hours flown per year:
        <input
            type="number"
            min="0"
            value={flightHours}
            onChange={(e) => {
            const value = Number(e.target.value)
            setFlightHours(value < 0 ? 0 : value)
            }}
        />
        </label>
      <br />

      <label>
        🔌 Monthly electricity usage (kWh):
        <input
          type="number"
          min="0"
          value={electricity}
          onChange={(e) => setElectricity(Number(e.target.value))}
        />
      </label>
      <br />

      <button onClick={calculateFootprint} style={{ marginTop: '1rem' }}>
        Calculate
      </button>

      {footprint !== null && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Estimated Carbon Footprint:</h2>
          <p><strong>{footprint} lbs CO₂</strong> per week</p>
        </div>
      )}
    </main>
  )
}

export default App