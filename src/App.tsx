import { Provider } from "react-redux";
import { Header } from "./components/Header";
import { Todos } from "./features/todos/components/Todos";
import { ThemeProvider } from "./features/todos/context/ThemeProvider";
import { store } from "./features/todos/store/store";


function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <Provider store={store}>
          <Todos />
        </Provider>
      </div>
    </ThemeProvider>
  );
}
export default App;
