import { useState } from 'react'
import './App.css'
function App() {
  const [milesDriven, setMilesDriven] = useState(0)
  const [meatMeals, setMeatMeals] = useState(0)
  const [shortFlights, setShortFlights] = useState(0)
  const [longFlights, setLongFlights] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [footprint, setFootprint] = useState(null)

  const calculateFootprint = () => {
    const emissions = {
      car: milesDriven * 0.411,
      meat: meatMeals * 6,
      shortFlights: shortFlights * 1100,
      longFlights: longFlights * 4400,
      electricity: electricity * 0.92,
    }

    const total =
      emissions.car +
      emissions.meat +
      emissions.shortFlights +
      emissions.longFlights +
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
          value={milesDriven}
          onChange={(e) => setMilesDriven(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        🍔 Meat-based meals per week:
        <input
          type="number"
          value={meatMeals}
          onChange={(e) => setMeatMeals(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        ✈️ Short flights this year:
        <input
          type="number"
          value={shortFlights}
          onChange={(e) => setShortFlights(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        🌍 Long flights this year:
        <input
          type="number"
          value={longFlights}
          onChange={(e) => setLongFlights(Number(e.target.value))}
        />
      </label>
      <br />

      <label>
        🔌 Monthly electricity usage (kWh):
        <input
          type="number"
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