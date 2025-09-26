import { useContext } from "react";
import DownloadIcon from "../assets/svg/DownloadIcon";
import { AiContext } from "../context/AiContext";

export default function ImageSection() {
  const { state, dispatch } = useContext(AiContext);

  // const handleDownload = (url) => {
  //   dispatch({type : "download_image", payload : url})
  // };
  const handleDownload = async (urlImage) => {
    dispatch({type : "download_image", payload : urlImage})
    try {
      const response = await fetch("urlImage");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  return (
    <div>
      <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
      {state.images.length === 0 && (
        <div className="flex text-center text-2xl justify-center">
          Please Enter A Prompts To Get Image
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {state.images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "relative",

              border: "1px solid #ddd",
              margin: "10px",
            }}
          >
            {/* Show loading overlay */}
            {img.loading && !img.error && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: 1,
                }}
              >
                Loading...
              </div>
            )}

            {/* Show error fallback */}
            {img.error ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                Failed to load
              </div>
            ) : (
              <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                <button
                  className="absolute bottom-2 right-2 p-1 bg-black bg-opacity-50 rounded hover:bg-opacity-75 text-white"
                  onClick={() => handleDownload(img.url)}
                >
                  <DownloadIcon />
                </button>
                

                <img
                  src={img.url}
                  alt={`Generated ${index}`}
                  onLoad={() => dispatch({ type: "image_loaded", payload: index })}
                  onError={() => dispatch({ type: "image_error", payload: index })}
                  style={{ display: img.loading ? "none" : "block" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
