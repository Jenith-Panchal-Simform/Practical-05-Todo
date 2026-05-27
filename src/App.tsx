import { Header } from "./components/Header";
import { Todo } from "./components/Todo";

function App() {
  return (
    <div className="h-screen">
      <Header style="h-[30%]" />
      <Todo style="h-[70%]" />
    </div>
  );
}
export default App;
