import { useEffect, useReducer } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import axios from "axios";
export default function TaskManager() {
  const taskReducer = (state, action) => {
    if (action.type == "SET-TASK") {
      return [...action.payload];
    } else if (action.type == "ADD-TASK") {
      return [...state, action.payload];
    } else if (action.type == "UPD-TASK") {
      return state.map((ele) => {
        if (ele._id == action.payload) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return { ...ele };
        }
      });
    } else if (action.type == "REM-TASK") {
      return state.filter((ele) => {
        return ele._id != action.payload;
      });
    }
  };
  // const [tasks, setTasks] = useState([]);
  const [tasksr, taskDispatch] = useReducer(taskReducer, []);
  useEffect(() => {
    axios.get("http://localhost:3521/api/tasks").then((res) => {
      const result = res.data;
      console.log(result);
      taskDispatch({ type: "SET-TASK", payload: result });
    });
  }, []);
  // const handleAddTask = (task) => {
  //   console.log("tm", task);
  //   const newArr = [...tasks, task];
  //   setTasks(newArr);
  // };
  // const handleRemoveTask = (id) => {
  //   console.log("in tm", id);
  //   const newArr = tasks.filter((ele) => {
  //     return ele.id !== id;
  //   });
  //   setTasks(newArr);
  // };
  // const handleUpdatestatus = (id) => {
  //   const newArr = tasks.map((ele) => {
  //     if (ele.id === id) {
  //       return { ...ele, isCompleted: !ele.isCompleted };
  //     } else {
  //       return { ...ele };
  //     }
  //   });
  //   setTasks(newArr);
  // };
  return (
    <div>
      <h1>Tasks-{tasksr.length}</h1>
      <TaskList
        tasksr={tasksr}
        taskDispatch={taskDispatch}
        // handleRemoveTask={handleRemoveTask}
        // handleUpdatestatus={handleUpdatestatus}
      />
      <TaskForm taskDispatch={taskDispatch} />
    </div>
  );
}
