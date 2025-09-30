import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function WorkoutDetail() {
  const router = useRouter();
  const { id } = router.query; // workout_id
  const [entries, setEntries] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState({
    exercise_id: "",
    sets: 3,
    reps: 10,
    weight: 0,
    rating: null,
  });

  // Fetch entries + exercise bank
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data: ex } = await supabase.from("exercises").select("*");
      setExercises(ex || []);

      const { data: ent } = await supabase
        .from("workout_entries")
        .select("*, exercises(name)")
        .eq("workout_id", id)
        .order("created_at", { ascending: true });

      setEntries(ent || []);
    };

    fetchData();
  }, [id]);

  // Add new entry
  const addEntry = async () => {
    if (!newEntry.exercise_id) return alert("Pick an exercise");

    const { error } = await supabase.from("workout_entries").insert([
      {
        workout_id: id,
        exercise_id: newEntry.exercise_id,
        sets: newEntry.sets,
        reps: newEntry.reps,
        weight: newEntry.weight,
        rating: newEntry.rating,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error adding entry");
    } else {
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Workout Details</h1>

      {/* Add Entry Form */}
      <h2>Add Exercise</h2>
      <select
        value={newEntry.exercise_id}
        onChange={(e) =>
          setNewEntry({ ...newEntry, exercise_id: e.target.value })
        }
      >
        <option value="">Select exercise</option>
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Sets"
        value={newEntry.sets}
        onChange={(e) =>
          setNewEntry({ ...newEntry, sets: +e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Reps"
        value={newEntry.reps}
        onChange={(e) =>
          setNewEntry({ ...newEntry, reps: +e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Weight"
        value={newEntry.weight}
        onChange={(e) =>
          setNewEntry({ ...newEntry, weight: +e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Rating (1–5)"
        value={newEntry.rating ?? ""}
        onChange={(e) =>
          setNewEntry({
            ...newEntry,
            rating: e.target.value ? +e.target.value : null,
          })
        }
      />
      <button onClick={addEntry}>Add</button>

      {/* Entries List */}
      <h2>Logged Entries</h2>
      <ul>
        {entries.map((ent) => (
          <li key={ent.id}>
            {ent.exercises?.name} — {ent.sets}x{ent.reps} @ {ent.weight}kg{" "}
            {ent.rating && `(Rating: ${ent.rating})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
