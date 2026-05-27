import { Header } from "./components/Header";
import { Todo } from "./components/Todo";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header style="flex-[3]" />
      <Todo style="flex-[7]" />
    </div>
  );
}
export default App;
