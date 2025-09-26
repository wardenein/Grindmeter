export default function Workout() {
  return (
    <div>
      <h1>Workout Tracker</h1>
      <p>Here you can log your sets, reps, and weights.</p>
    </div>
  )
}


<!DOCTYPE html>
<html lang="eng">
  <head>
    <meta charset="UTF-8">
    <meta name="Viewport" content="width=device-width, initial-scale=1.0">
    <title>Workout Tracker</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <nav>
      <a href="index.html">Home</a>
      <a href="workout.html">Workout Tracker</a>
      <a href="food.html"> Food and Supp Tracker</a>
      <a href="plan.html"> Workout Generator</a>
      <a href="info.html"> Information</a>
    </nav>
    
    <h1>Workout Tracker</h1>
    
    <form id="workout-form">
      <input type="text" id="exercise" placeholder="Exercise" required>
      <input type="number" id="sets" placeholder="Sets" required>
      <input type="number" id="reps" placeholder="Reps" required>
      <input type="number" id="weight" placeholder="Weight" required>
      <button type="submit"> Add Workout</button>
    </form>

    <ul id="workout-list"></ul>



    Log 



    <ul id="workout-list"></ul>

<div id="workout-stats">
  <h2>Workout Stats</h2>
  <p id="total-sets">Total sets: 0</p>
  <p id="total-reps">Total reps: 0</p>
  <p id="total-weight">Total weight: 0</p>
  <p id="total-volume">Total volume: 0</p>
</div>

    <script src="script.js"></script>
  
  </body>
</html>
