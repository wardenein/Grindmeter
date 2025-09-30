// components/Navbar.js
export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#333", color: "#fff" }}>
      <h1>Grindmeter</h1>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li><a href="/">Home</a></li>
        <li><a href="/workouts">Workouts</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  );
}
