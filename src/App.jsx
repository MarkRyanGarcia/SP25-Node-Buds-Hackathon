import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import './App.css'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

function App() {
  const [milesDriven, setMilesDriven] = useState(0)
  const [meatMeals, setMeatMeals] = useState(0)
  const [electricity, setElectricity] = useState(0)
  const [footprint, setFootprint] = useState(null)
  const [flightHours, setFlightHours] = useState(0)
  const [emissionsBreakdown, setEmissionsBreakdown] = useState(null)

  const calculateFootprint = () => {
    const carEmissions = (Number(milesDriven) || 0) * 0.411
    const meatEmissions = (Number(meatMeals) || 0) * 6
    const flightEmissions = (Number(flightHours) || 0) * 134
    const electricityEmissions = (Number(electricity) || 0) * 0.92

    const emissions = {
      Car: carEmissions,
      Meat: meatEmissions,
      Flights: flightEmissions,
      Electricity: electricityEmissions,
    }

    const total =
      carEmissions + meatEmissions + flightEmissions + electricityEmissions

    setFootprint(Math.round(total))
    setEmissionsBreakdown(emissions)
  }

  const chartData = emissionsBreakdown && {
    labels: Object.keys(emissionsBreakdown),
    datasets: [
      {
        label: 'Emissions (lbs CO₂)',
        data: Object.values(emissionsBreakdown),
        backgroundColor: ['#4caf50', '#f44336', '#2196f3', '#ff9800'],
      },
    ],
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
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

          {chartData && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Emissions Breakdown</h3>
              <Bar data={chartData} />
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export default App