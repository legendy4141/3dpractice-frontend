import { useContext } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";

export const useExerciseContext = () => {
  return useContext(ExerciseContext);
};
