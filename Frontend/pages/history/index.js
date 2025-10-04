import { useEffect, useMemo, useState } from 'react';

const HISTORY_KEY = 'workoutHistory';

function groupByDate(sessions) {
  const byDate = {};
  for (const s of sessions) {
    const d = new Date(s.startedAt).toISOString().slice(0, 10);
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(s);
  }
  return byDate;
}

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
  }, []);

  const grouped = useMemo(() => groupByDate(history), [history]);

  return (
    <div style={{ padding: 16 }}>
      <h1>History</h1>
      {Object.keys(grouped).length === 0 ? (
        <p>No past workouts yet.</p>
      ) : (
        Object.entries(grouped).sort((a,b) => (a[0] < b[0] ? 1 : -1)).map(([date, sessions]) => (
          <div key={date} style={{ marginBottom: 16 }}>
            <h2>{date}</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sessions.map((s) => (
                <li key={s.id} style={{ border: '1px solid #eee', marginBottom: 8, padding: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{s.name || 'Quick Session'}</strong>
                    <span>{new Date(s.startedAt).toLocaleTimeString()} - {new Date(s.endedAt).toLocaleTimeString()}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
                    {s.items.map((it) => (
                      <li key={it.id} style={{ display: 'flex', gap: 8 }}>
                        <span style={{ flex: 1 }}>{it.name}</span>
                        <span>{it.sets}x{it.reps} @ {it.weight}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
