import { Header } from "./components/Header";
import { Todos } from "./components/Todos";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Todos />
    </div>
  );
}
export default App;
