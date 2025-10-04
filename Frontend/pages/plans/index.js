import { useEffect, useMemo, useState } from 'react';

const EX_STORAGE = 'exerciseLibrary';
const PLANS_KEY = 'workoutPlans';

export default function Plans() {
  const [exercises, setExercises] = useState([]);
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [planItems, setPlanItems] = useState([]);

  useEffect(() => {
    setExercises(JSON.parse(localStorage.getItem(EX_STORAGE) || '[]'));
    setPlans(JSON.parse(localStorage.getItem(PLANS_KEY) || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  }, [plans]);

  const addItem = () => {
    const exercise = exercises.find((e) => e.id === selectedExerciseId);
    if (!exercise) return;
    const newItem = { id: crypto.randomUUID(), exerciseId: exercise.id, name: exercise.name, sets: 3, reps: 10, weight: 0 };
    setPlanItems([...planItems, newItem]);
    setSelectedExerciseId('');
  };

  const savePlan = () => {
    if (!planName.trim() || planItems.length === 0) return;
    const newPlan = { id: crypto.randomUUID(), name: planName.trim(), items: planItems };
    setPlans([newPlan, ...plans]);
    setPlanName('');
    setPlanItems([]);
  };

  const deletePlan = (id) => setPlans(plans.filter((p) => p.id !== id));

  return (
    <div style={{ padding: 16 }}>
      <h1>Plans</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Create Plan</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          <input placeholder="Plan name" value={planName} onChange={(e) => setPlanName(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} style={{ flex: 1 }}>
              <option value="">Select exercise</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
            <button onClick={addItem}>Add</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {planItems.map((it) => (
              <li key={it.id} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px) auto', gap: 8, alignItems: 'center' }}>
                <span>{it.name}</span>
                <input type="number" value={it.sets} onChange={(e) => setPlanItems(planItems.map(p => p.id === it.id ? { ...p, sets: +e.target.value } : p))} />
                <input type="number" value={it.reps} onChange={(e) => setPlanItems(planItems.map(p => p.id === it.id ? { ...p, reps: +e.target.value } : p))} />
                <input type="number" value={it.weight} onChange={(e) => setPlanItems(planItems.map(p => p.id === it.id ? { ...p, weight: +e.target.value } : p))} />
                <button onClick={() => setPlanItems(planItems.filter(p => p.id !== it.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={savePlan} disabled={!planName.trim() || planItems.length === 0}>Save Plan</button>
        </div>
      </section>

      <section>
        <h2>Saved Plans</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {plans.map((p) => (
            <li key={p.id} style={{ border: '1px solid #eee', marginBottom: 8, padding: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{p.name}</strong>
                <button onClick={() => deletePlan(p.id)}>Delete</button>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
                {p.items.map((it) => (
                  <li key={it.id} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ flex: 1 }}>{it.name}</span>
                    <span>{it.sets}x{it.reps} @ {it.weight}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
