import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [value, setValue] = useState("")
  const [todo, setTodo] = useState([])

  const handleInputValue = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    axios.get('http://localhost:4060/todo')
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddBtn = () => {
    axios.post('http://localhost:4060/addTodo', { value })
      .then((res) => {
        console.log(res)
        setValue("")
        fetchTodoList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdateBtn = (id) => {
    console.log(id)
    const newValue = prompt('Enter a Value')
    console.log(newValue)

    if (newValue) {
      axios.put(`http://localhost:4060/updateTodo/${id}`, { newValue })
        .then((res) => {
          console.log(res)
          fetchTodoList()

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleDeleteBtn = (id) => {
    console.log(id)
    axios.delete(`http://localhost:4060/deleteTodo/${id}`)
      .then((res) => {
        console.log(res)
        fetchTodoList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const updateTodoBtn = () => {

  // }

  return (
    <div className="container">
      <h1>To-Do</h1>
      <input
        type="text"
        placeholder="Input your todo.."
        onChange={handleInputValue}
        value={value}
      />
      <button onClick={handleAddBtn}>Add</button>
      <ul>
        {todo.map((data) => (
          <div key={data._id}>
            <li>{data.Todo}</li>
            <button onClick={() => handleUpdateBtn(data._id)} >Update</button>
            <button onClick={() => handleDeleteBtn(data._id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );

}

export default App
