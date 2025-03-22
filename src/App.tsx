import { HashRouter, Routes, Route } from "react-router";

import MultiSelect from "./components/MultiSelect";
import { useLocalStorage } from "./hooks/useLocalStorage";

import PokeQuiz from "./pokequiz/PokeQuiz";
import RandomRedirector from "./RandomRedirector";
import { RegionList } from "./models/Region";
import { getRegion, REGIONS } from "./models/registry";
import "./App.css";

const options = Object.entries(REGIONS).map(([name, region]) => {
  return {
    key: region.id,
    label: `${name} (Gen ${region.id})`,
    value: region,
  };
});

export default function App() {
  const [regions, setRegions] = useLocalStorage(
    "regions",
    new RegionList(getRegion()),
    (stored) => new RegionList(...JSON.parse(stored)),
  );
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/:id" element={<PokeQuiz regions={regions} />} />
          <Route path="/" element={<RandomRedirector regions={regions} />} />
        </Routes>
      </HashRouter>

      <MultiSelect
        className="absolute bottom-2 right-1"
        trigger={
          <button className="px-2 pt-0 pb-[5px] text-3xl bg-zinc-200 text-slate-900 leading-none">
            ⚙
          </button>
        }
        options={options}
        selected={regions.map((region) => region.id)}
        onChange={(values) => setRegions(new RegionList(...values))}
      />
    </div>
  );
}
