import { Navigate } from "react-router";

import { getRandom } from "./pokequiz/PokeID";

export default function RandomRedirector() {
  return <Navigate to={`/${getRandom()}`} replace />;
}
