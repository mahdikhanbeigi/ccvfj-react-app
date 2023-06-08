import FormGeneratorExample from "./Components/FormGenerator";
import "./Components/FormGenerator/configForm";
import { BasicArgs, SignArgs } from "./data/form";

function App() {
  return (
    <div className="App">
      <FormGeneratorExample {...SignArgs} />
    </div>
  );
}

export default App;
