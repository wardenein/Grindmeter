// components/WorkoutCard.js
export default function WorkoutCard({ workout, exp }) {
  return (
    <li style={{ padding: "0.5rem 0" }}>
      {workout.exercise} — Sets: {workout.sets}, Reps: {workout.reps}, Weight: {workout.weight} kg, EXP: {exp.toFixed(2)}
    </li>
  );
}

