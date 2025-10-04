// pages/workouts/index.js
import { useState, useEffect } from "react";
import WorkoutCard from "../../components/WorkoutCard";
import Stats from "../../components/Stats";
import { calculateEXP } from "../../lib/exp";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  // Load workouts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(saved);
  }, []);

  // Save workouts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (e) => {
    e.preventDefault();
    const newWorkout = { exercise, sets: Number(sets), reps: Number(reps), weight: Number(weight) };
    setWorkouts([...workouts, newWorkout]);
    setExercise(""); setSets(""); setReps(""); setWeight("");
  };

  // Calculate stats
  const totalSets = workouts.reduce((sum, w) => sum + w.sets, 0);
  const totalReps = workouts.reduce((sum, w) => sum + w.sets * w.reps, 0);
  const totalWeight = workouts.reduce((sum, w) => sum + w.weight, 0);
  const totalVolume = workouts.reduce((sum, w) => sum + w.sets * w.reps * w.weight, 0);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Track your workouts</h2>

      <form onSubmit={addWorkout} style={{ marginBottom: "1rem" }}>
        <input placeholder="Exercise" value={exercise} onChange={e => setExercise(e.target.value)} required />
        <input type="number" placeholder="Sets" value={sets} onChange={e => setSets(e.target.value)} required />
        <input type="number" placeholder="Reps" value={reps} onChange={e => setReps(e.target.value)} required />
        <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)} required />
        <button type="submit">Add Workout</button>
      </form>

      <ul>
        {workouts.map((w, i) => (
          <WorkoutCard key={i} workout={w} exp={calculateEXP(w.exercise, w.sets, w.reps, w.weight)} />
        ))}
      </ul>

      <Stats totalSets={totalSets} totalReps={totalReps} totalWeight={totalWeight} totalVolume={totalVolume} />
    </div>
  );
}
