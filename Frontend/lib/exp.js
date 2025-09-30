// lib/exp.js
export const exerciseDifficulty = {
  benchPress: 1.0,
  squat: 1.3,
  bicepCurl: 0.7,
  deadlift: 1.5,
  overheadPress: 1.1,
};

export function calculateEXP(exercise, sets, reps, weight) {
  const difficulty = exerciseDifficulty[exercise] || 1;
  const baseEXP = weight * reps * sets;
  return baseEXP * difficulty;
}
