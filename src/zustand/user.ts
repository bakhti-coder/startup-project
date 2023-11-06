import { UserType } from "../types";
import crud from "./crud";

const useUser = crud<UserType>("users");
