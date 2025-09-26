import { createClient } from "@/utils/supabase/server";

export default async function ExercisesPage() {
  const supabase = createClient();

  // Get logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch global + personal exercises
  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("*")
    .or(`user_id.is.null,user_id.eq.${user?.id}`)
    .order("name");

  if (error) {
    console.error(error);
    return <div>Error loading exercises</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <ul className="space-y-2">
        {exercises?.map((ex) => (
          <li key={ex.id} className="p-2 border rounded">
            <strong>{ex.name}</strong>{" "}
            {ex.muscle_group ? `(${ex.muscle_group})` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}


import Link from "next/link";

// inside your .map()
<li key={workout.id}>
  <Link href={`/workouts/${workout.id}`}>
    {workout.date} - {workout.notes || "No notes"}
  </Link>
</li>
