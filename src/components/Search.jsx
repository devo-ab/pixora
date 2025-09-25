import ArrowIcon from "../assets/svg/ArrowIcon";
import SearchIcon from "../assets/svg/SearchIcon";

export default function Search({ setPrompts, generateImage }) {
  return (
    <div className="relative mb-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="pl-5 pr-2">
          <SearchIcon></SearchIcon>
        </div>
        <input
          type="text"
          placeholder="Create with Prompts"
          className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg"
          onChange={(e) => setPrompts(e.target.value)}
        />
        <button className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full" onClick={generateImage}>
          <ArrowIcon></ArrowIcon>
        </button>
      </div>
    </div>
  );
}
