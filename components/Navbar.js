import Link from 'next/link';
import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/workout">Workouts</Link></li>
        <li><Link href="/food">Food</Link></li>
      </ul>
    </nav>
  )
}
