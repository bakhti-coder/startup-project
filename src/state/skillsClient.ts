import { Skills } from "../types";
import crud from "./crud";

const useSkillsClient = crud<Skills>("skills");

export default useSkillsClient;
