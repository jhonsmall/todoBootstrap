import { createEffect, createSignal } from "solid-js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = createSignal(JSON.parse(localStorage.getItem('todos')) || []);
  const [input, setInput] = createSignal("");

  const addTodo = () => {
    const newTodos = [...todos(), { text: input(), done: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos()];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <h1>To-Do List</h1>
          <div class="input-group mb-3">
            <input type="text" class="form-control" value={input()} onInput={(e) => setInput(e.target.value)} />
            <button class="btn btn-primary" onClick={addTodo}>Add</button>
          </div>
          <ul class="list-group">
            {todos().map((todo, index) => (
              <li class="list-group-item">
                <input type="checkbox" class="form-check-input me-2" checked={todo.done} onChange={() => toggleTodo(index)} />
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

