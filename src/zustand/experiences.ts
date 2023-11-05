import { Experience } from "../types";
import crud from "./crud";

const useExperiences = crud<Experience>("experiences");

export default useExperiences;
