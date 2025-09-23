import { useReducer } from "react";
import Glow from "./components/Glow";
import Header from "./components/Header";
import Main from "./components/Main";
import { initialState, reducer } from "./reducer/AiReducer";
import { AiContext } from "./context/AiContext";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AiContext.Provider value={{ state, dispatch }}>
          <Header></Header>
          <Glow></Glow>
          <Main></Main>
        </AiContext.Provider>
      </div>
    </div>
  );
}

export default App;
