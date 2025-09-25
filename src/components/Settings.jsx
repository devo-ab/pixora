import { useContext, useEffect, useState } from "react";
import Search from "./Search";
import { AiContext } from "../context/AiContext";

export default function Settings() {
  const { dispatch } = useContext(AiContext);
  const [prompts, setPrompts] = useState("");
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [model, setModel] = useState("flux");

  const [models, setModels] = useState(["flux"]);
  const [ratio, setRatio] = useState("1:1");

  const aspectMap = {
    "1:1": [1024, 1024],
    "16:9": [1920, 1080],
    "4:3": [1024, 768],
    "3:2": [1080, 720],
  };

  useEffect(() => {
    const getModel = async () => {
      try {
        const res = await fetch("https://image.pollinations.ai/models");
        if (!res.ok) {
          throw new Error(`Failed to fetch model ${res.status}`);
        }
        const data = await res.json();
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    getModel();
  }, []);

  const handleRatioClick = (r) => {
    setRatio(r);
    const [w, h] = aspectMap[r];
    setWidth(w);
    setHeight(h);
  };

  

  const generateImages = () => {
    const imageUrls = Array.from({ length: 9 }, () => {
      const randomSeed = Math.floor(Math.random() * 1000000);
      return `https://pollinations.ai/prompt/${encodeURIComponent(
        prompts
      )}?width=${width}&height=${height}&seed=${randomSeed}&model=${model}`;
    });

    dispatch({ type: "generate_image", payload: imageUrls });
  };

  

  

  return (
    <div>
      <Search setPrompts={setPrompts} generateImage={generateImages} />
      <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Advanced Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-zinc-700 mb-1">
              Model
            </label>
            <select
              id="model"
              className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onChange={(e) => setModel(e.target.value)}
            >
              {models.map((model, idx) => (
                <option className="bg-zinc-900" key={idx} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="seed" className="block text-sm font-medium text-zinc-700 mb-1">
              Seed (for reproducible results)
            </label>
            <input
              type="number"
              id="seed"
              disabled
              className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Random"
            />
          </div>

          <div>
            <label htmlFor="width" className="block text-sm font-medium text-zinc-700 mb-1">
              Width
            </label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md"
            />
          </div>

          {/* 2nd row - height input */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-zinc-700 mb-1">
              Height
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md"
            />
          </div>

          {/* 2nd row - aspect ratio buttons */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Aspect Ratio Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {["1:1", "16:9", "4:3", "3:2"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRatioClick(r)}
                  className={`px-3 py-3 text-xs rounded transition-colors ${
                    ratio === r
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-zinc-900/10 text-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
