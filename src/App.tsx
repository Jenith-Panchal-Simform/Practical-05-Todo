import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Todos />
    </div>
  );
}
export default App;
