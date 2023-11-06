import { Portfolios } from "../types";
import crud from "./crud";

const usePortfolios = crud<Portfolios>("portfolios");

export default usePortfolios;
