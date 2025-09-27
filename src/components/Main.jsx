import { useContext } from "react";
import { AiContext } from "../context/AiContext";
import CreateImages from "../Pages/CreateImages";
import DownloadPage from "../Pages/DownloadPage";

export default function Main() {
  const { state } = useContext(AiContext);
  return (
    <div>
      {state.selectedTab === "createImage" ? (
        <CreateImages></CreateImages>
      ) : (
        <DownloadPage></DownloadPage>
      )}
    </div>
  );
}
