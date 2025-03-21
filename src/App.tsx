import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router";

import MultiSelect from "./components/MultiSelect";

import PokeQuiz from "./pokequiz/PokeQuiz";
import RandomRedirector from "./RandomRedirector";
import { RegionList } from "./models/Region";
import { REGIONS } from "./models/registry";
import "./App.css";

const options = Object.entries(REGIONS).map(([name, region]) => {
  return {
    label: `${name} (Gen ${region.id})`,
    value: region,
  };
});

export default function App() {
  const [regions, setRegions] = useState(new RegionList());
  return (
    <div className="App relative">
      <MultiSelect
        className="absolute top-0 left-0"
        trigger={
          <button className="px-2 pt-0 pb-[5px] text-3xl bg-zinc-200 text-slate-900 leading-none">
            ⚙
          </button>
        }
        options={options}
        onChange={(values) => setRegions(new RegionList(...values))}
      />
      <HashRouter>
        <Routes>
          <Route path="/:id" element={<PokeQuiz regions={regions} />} />
          <Route path="/" element={<RandomRedirector regions={regions} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
