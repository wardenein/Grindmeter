// pages/workouts/index.js
import { useState, useEffect } from "react";
import WorkoutCard from "../../components/WorkoutCard";
import Stats from "../../components/Stats";
import { calculateEXP } from "../../lib/exp";

const EX_STORAGE = 'exerciseLibrary';
const PLANS_KEY = 'workoutPlans';
const HISTORY_KEY = 'workoutHistory';

export default function Workouts() {
  const [exercises, setExercises] = useState([]);
  const [plans, setPlans] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [startedAt, setStartedAt] = useState(null);

  useEffect(() => {
    setExercises(JSON.parse(localStorage.getItem(EX_STORAGE) || '[]'));
    setPlans(JSON.parse(localStorage.getItem(PLANS_KEY) || '[]'));
  }, []);

  const startFromPlan = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;
    setActiveItems(plan.items.map((it) => ({ ...it, id: crypto.randomUUID() })));
    setSessionName(plan.name);
    setIsActive(true);
    setStartedAt(Date.now());
  };

  const startQuick = () => {
    setActiveItems([]);
    setSessionName('');
    setIsActive(true);
    setStartedAt(Date.now());
  };

  const addItem = (exerciseId) => {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;
    setActiveItems([...activeItems, { id: crypto.randomUUID(), exerciseId: ex.id, name: ex.name, sets: 3, reps: 10, weight: 0 }]);
  };

  const updateItem = (id, field, value) => {
    setActiveItems(activeItems.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const removeItem = (id) => setActiveItems(activeItems.filter((it) => it.id !== id));

  const finishSession = () => {
    if (!isActive) return;
    const session = {
      id: crypto.randomUUID(),
      name: sessionName.trim() || 'Quick Session',
      items: activeItems,
      startedAt,
      endedAt: Date.now(),
    };
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    history.push(session);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    setIsActive(false);
    setActiveItems([]);
    setSessionName('');
    setStartedAt(null);
  };

  return (
    <div style={{ padding: '1rem' }}>
      {!isActive ? (
        <div style={{ display: 'grid', gap: 12 }}>
          <h2>Start Workout</h2>
          <button onClick={startQuick}>Start Quick Session</button>
          <div>
            <h3>Start From Plan</h3>
            {plans.length === 0 ? (
              <p>No saved plans. Create one on the Plans page.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {plans.map((p) => (
                  <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <span>{p.name}</span>
                    <button onClick={() => startFromPlan(p.id)}>Start</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          <h2>{sessionName || 'Quick Session'}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <select onChange={(e) => addItem(e.target.value)} value="">
              <option value="">Add exercise...</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
            <button onClick={finishSession} disabled={activeItems.length === 0}>Finish Session</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {activeItems.map((it) => (
              <li key={it.id} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 80px) auto', gap: 8, alignItems: 'center' }}>
                <span>{it.name}</span>
                <input type="number" value={it.sets} onChange={(e) => updateItem(it.id, 'sets', +e.target.value)} />
                <input type="number" value={it.reps} onChange={(e) => updateItem(it.id, 'reps', +e.target.value)} />
                <input type="number" value={it.weight} onChange={(e) => updateItem(it.id, 'weight', +e.target.value)} />
                <button onClick={() => removeItem(it.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
