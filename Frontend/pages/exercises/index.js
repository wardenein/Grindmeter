import { useEffect, useState } from 'react';

const STORAGE_KEY = 'exerciseLibrary';

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setExercises(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (e) => {
    e.preventDefault();
    const newExercise = { id: crypto.randomUUID(), name: name.trim(), category };
    if (!newExercise.name) return;
    setExercises([newExercise, ...exercises]);
    setName('');
    setCategory('General');
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const renameExercise = (id, newName) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, name: newName } : ex)));
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Exercises</h1>
      <form onSubmit={addExercise} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Push</option>
          <option>Pull</option>
          <option>Legs</option>
          <option>Core</option>
          <option>Cardio</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 16, padding: 0, listStyle: 'none' }}>
        {exercises.map((ex) => (
          <li key={ex.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <input
              value={ex.name}
              onChange={(e) => renameExercise(ex.id, e.target.value)}
              style={{ flex: 1 }}
            />
            <span style={{ opacity: 0.6 }}>{ex.category}</span>
            <button onClick={() => removeExercise(ex.id)} aria-label={`Delete ${ex.name}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
