const initialState = {
  selectedTab: "createImage",
  images: [],
  downloads: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "tab":
      return { ...state, selectedTab: action.payload };

    case "generate_image":
      return {
        ...state,
        images: action.payload.map((url) => ({
          url,
          loading: true,
          error: false,
        })),
      };
        return {
      ...state,
      images: action.payload,
    };

    case "image_loaded":
      return {
        ...state,
        images: state.images.map((img, index) =>
          index === action.payload ? { ...img, loading: false } : img
        ),
      };

    // case "image_error":
    //   return {
    //     ...state,
    //     images: state.images.map((img, index) =>
    //       index === action.payload ? { ...img, loading: false, error: true } : img
    //     ),
    //   };

  //   case "download_image":
  //     if (state.downloads.includes(action.payload)) {
  //       return state;
  //     }
  //     return {
  //       ...state,
  //       downloads: [...state.downloads, action.payload],
  //     };

  //   default:
  //     return state;
  // }
}

export { initialState, reducer };
