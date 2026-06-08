import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { TodosProvider } from "./features/todos/context/TodosProvider";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <TodosProvider>
        <Todos />
      </TodosProvider>
    </div>
  );
}
export default App;
