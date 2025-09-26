import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <ul style={{ display: "flex", gap: 20, listStyle: "none", margin: 0, padding: 0 }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/workout">Workouts</Link></li>
        <li><Link href="/food">Food</Link></li>
        <li><Link href="/supps">Supplements</Link></li>
        <li><Link href="/plan">Plans</Link></li>
        <li><Link href="/rank">Ranks</Link></li>
        <li><Link href="/info">Info</Link></li>
      </ul>
    </nav>
  );
}
