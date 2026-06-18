import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { ThemeProvider } from "./features/todos/context/ThemeProvider";
import { TodosProvider } from "./features/todos/context/TodosProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <TodosProvider>
          <Todos />
        </TodosProvider>
      </div>
    </ThemeProvider>
  );
}
export default App;
