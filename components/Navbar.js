import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #eee', marginBottom: 12 }}>
      <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Link href="/index.html">Home</Link></li>
        <li><Link href="/workout.html">Workouts</Link></li>
        <li><Link href="/food.html">Food</Link></li>
        <li><Link href="/Rank.html">Rank</Link></li>
        <li><Link href="/supps.html">Supplements</Link></li>
        <li><Link href="/exercises">Exercises</Link></li>
      </ul>
    </nav>
  );
}
