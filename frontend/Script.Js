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

