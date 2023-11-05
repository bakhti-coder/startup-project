import { Education } from "../types";
import crud from "./crud";

const useEducation = crud<Education>("education");

export default useEducation;
