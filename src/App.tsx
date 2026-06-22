import { Provider } from "react-redux";

import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { ThemeProvider } from "./features/todos/context/ThemeProvider";
import { TodoStore } from "./features/todos/store/TodoStore";

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <Provider store={TodoStore}>
          <Todos />
        </Provider>
      </div>
    </ThemeProvider>
  );
}
export default App;
