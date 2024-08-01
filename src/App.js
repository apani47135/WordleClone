import "./App.css";
import Wordgrid from "./components/Wordgrid";
import { WordleProvider } from "./Context/WordleContext";

function App() {
  return (
    <div className="App">
      <WordleProvider>
        <Wordgrid />
      </WordleProvider>
    </div>
  );
}

export default App;
