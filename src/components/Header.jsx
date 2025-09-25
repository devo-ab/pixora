import { useContext } from "react";
import logo from "../assets/logo.svg";
import { AiContext } from "../context/AiContext";

export default function Header() {
  const {state, dispatch} = useContext(AiContext);

  const handleTabChange = (tab) => {
    dispatch({ type: "tab", payload: tab });
    console.log(tab)
  };

  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img src={logo} className="h-10" />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        <a
          href="#"
          className={`${
            state.selectedTab === "createImage"
              ? "hover:text-zinc-200 font-medium text-zinc-200 cursor-pointer transition-all"
              : "hover:text-zinc-200 cursor-pointer transition-all"
          }`}
          onClick={() => handleTabChange("createImage")}
        >
          Create Image
        </a>
        <a
          href="#"
          className={`${
            state.selectedTab === "download"
              ? "hover:text-zinc-200 font-medium text-zinc-200 cursor-pointer transition-all"
              : "hover:text-zinc-200 cursor-pointer transition-all"
          }`}
          onClick={() => handleTabChange("download")}
        >
          Downloaded
        </a>
      </ul>
    </header>
  );
}
