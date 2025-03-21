import { Navigate } from "react-router";
import { RegionList } from "./models/Region";

export interface RandomRedirectorProps {
  regions: RegionList;
}

export default function RandomRedirector({ regions }: RandomRedirectorProps) {
  return <Navigate to={`/${regions.getRandom()}`} replace />; // todo
}
