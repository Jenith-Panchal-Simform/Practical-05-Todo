import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { ThemeProvider } from "./features/todos/context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <Todos />
      </div>
    </ThemeProvider>
  );
}
export default App;
