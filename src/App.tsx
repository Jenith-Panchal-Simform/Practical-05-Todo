import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { TodoProvider } from "./features/todos/context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <Todos />
      </div>
    </TodoProvider>
  );
}
export default App;
