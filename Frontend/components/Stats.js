// components/Stats.js
export default function Stats({ totalSets, totalReps, totalWeight, totalVolume }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <p>Total sets: {totalSets}</p>
      <p>Total reps: {totalReps}</p>
      <p>Total weight: {totalWeight} kg</p>
      <p>Total volume: {totalVolume} kg</p>
    </div>
  );
}
