function sayHello() {
    alert("Hello from Javascript");
 }






Level fonction






const form = document.getElementById('workout-form');
const workoutList = document.getElementById('workout-list');

let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

const exerciseDifficulty = {
  benchPress: 1.0,
  squat: 1.3,
  bicepCurl: 0.7,
  deadlift: 1.5,
  overheadPress: 1.1,
};

 /**
 * Calculate EXP for a workout entry.
 * @param {string} exercise - exercise name, e.g. 'benchPress'
 * @param {number} sets - number of sets performed
 * @param {number} reps - number of reps per set
 * @param {number} weight - weight lifted in pounds (or kg)
 * @returns {number} calculated EXP value
 */
function calculateEXP(exercise, sets, reps, weight) {
  const difficulty = exerciseDifficulty[exercise] || 1; // default multiplier = 1
  const baseEXP = weight * reps * sets;
  const adjustedEXP = baseEXP * difficulty;
  return adjustedEXP;
}

// Example usage:
const exp1 = calculateEXP('benchPress', 3, 10, 100); // sets=3, reps=10, 100lbs
console.log(`EXP earned: ${exp1.toFixed(2)}`);


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const exercise = form.exercise.value.trim();
  const sets = Number(form.sets.value);
  const reps = Number(form.reps.value);
  const weight = Number(form.weight.value);

  // Create workout object
  const workout = { exercise, sets, reps, weight };

  // Save workout
  workouts.push(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));

  // Update UI
  displayWorkouts();

  // Reset form
  form.reset();
});

// Initial display on page load
displayWorkouts();

function displayWorkouts() {
  workoutList.innerHTML = ''; // Clear existing list

  workouts.forEach(workout => {
    const exp = calculateEXP(workout.exercise, workout.sets, workout.reps, workout.weight).toFixed(2);
    const li = document.createElement('li');
    li.textContent = `${workout.exercise} — Sets: ${workout.sets}, Reps: ${workout.reps}, Weight: ${workout.weight}, EXP: ${exp}`;
    workoutList.appendChild(li);
  });
}



Local storage of workouts tracking


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workout-form");
  const workoutList = document.getElementById("workout-list");

  // Load saved workouts on page load
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.forEach(addWorkoutToList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;

    const workout = { exercise, sets, reps, weight };

    // Save to localStorage
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));

    // Add to page
    addWorkoutToList(workout);

    // Reset form
    form.reset();
  });

  function addWorkoutToList(workout) {
    const li = document.createElement("li");
    li.textContent = `${workout.exercise} - ${workout.sets} sets x ${workout.reps} reps @ ${workout.weight}kg`;
    workoutList.appendChild(li);
  }
});








log 



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workout-form");
  const workoutList = document.getElementById("workout-list");

  // Stats elements
  const totalSetsEl = document.getElementById("total-sets");
  const totalRepsEl = document.getElementById("total-reps");
  const totalWeightEl = document.getElementById("total-weight");
  const totalVolumeEl = document.getElementById("total-volume");

  // Load saved workouts
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.forEach(addWorkoutToList);
  updateStats();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const sets = parseInt(document.getElementById("sets").value);
    const reps = parseInt(document.getElementById("reps").value);
    const weight = parseFloat(document.getElementById("weight").value);

    const workout = { exercise, sets, reps, weight };

    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));

    addWorkoutToList(workout);
    updateStats();

    form.reset();
  });

  function addWorkoutToList(workout) {
    const li = document.createElement("li");
    li.textContent = `${workout.exercise} - ${workout.sets} sets × ${workout.reps} reps @ ${workout.weight}kg`;
    workoutList.appendChild(li);
  }

  function updateStats() {
    let totalSets = 0;
    let totalReps = 0;
    let totalWeight = 0;
    let totalVolume = 0;

    workouts.forEach(w => {
      totalSets += w.sets;
      totalReps += w.sets * w.reps;
      totalWeight += w.weight;
      totalVolume += w.sets * w.reps * w.weight;
    });

    totalSetsEl.textContent = `Total sets: ${totalSets}`;
    totalRepsEl.textContent = `Total reps: ${totalReps}`;
    totalWeightEl.textContent = `Total weight: ${totalWeight} kg`;
    totalVolumeEl.textContent = `Total volume: ${totalVolume} kg`;
  }
});
