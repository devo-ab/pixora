import { useContext } from "react";
import DownloadIcon from "../assets/svg/DownloadIcon";

import { AiContext } from "../context/AiContext";

export default function DownloadPage() {

  const {state} = useContext(AiContext)

  return (
    <div className="relative z-10">
      <h2 className="text-4xl font-bold mb-8">
        Downloaded <span className="text-2xl">👋</span>
      </h2>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {state.downloads.length === 0 && <div className="text-white text-2xl">No Downloads</div>}

          {
            state.downloads.map((item, index) => (<div key={index} className="image-card rounded-xl overflow-hidden cursor-pointer relative">
            <div className="absolute bottom-2 right-2  p-1 ">
              <DownloadIcon></DownloadIcon>
            </div>
            <img
              src={item}
              alt="Portrait with yellow background"
              className="w-full h-48 object-cover"
            />
          </div>))
          }
        </div>
      </div>
    </div>
  );
}
