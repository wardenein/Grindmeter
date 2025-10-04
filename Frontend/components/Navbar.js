// components/Navbar.js
export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>Grindmeter</h1>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li><a href="/workouts" style={{ color: '#fff', textDecoration: 'none' }}>Workouts</a></li>
          <li><a href="/plans" style={{ color: '#fff', textDecoration: 'none' }}>Plans</a></li>
          <li><a href="/exercises" style={{ color: '#fff', textDecoration: 'none' }}>Exercises</a></li>
          <li><a href="/history" style={{ color: '#fff', textDecoration: 'none' }}>History</a></li>
        </ul>
      </div>
    </nav>
  );
}
