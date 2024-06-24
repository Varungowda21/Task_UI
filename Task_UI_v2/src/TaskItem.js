import axios from "axios";

export default function TaskItem(props) {
  const { id, title, description, isCompleted } = props;

  const handleRemove = () => {
    console.log(id);
    //   console.log('in ti')
    //   props.handleRemoveTask(id)
    axios.delete("http://localhost:3521/api/tasks/" + id).then((res) => {
      const result = res.data;
      console.log(result);
      props.taskDispatch({ type: "REM-TASK", payload: id });
    });
  };
  const handleClick = () => {
    // we should do api call here
    const newData = {
      title,
      description,
      isCompleted: !isCompleted,
    };
    console.log(newData);
    axios.put("http://localhost:3521/api/tasks/" + id, newData).then((res) => {
      const result = res.data;
      console.log(result);
      props.taskDispatch({ type: "UPD-TASK", payload: id });
    });
    // props.handleUpdatestatus(id);
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleClick}
      ></input>
      {title}-{description}
      <button onClick={handleRemove}>remove</button>
    </li>
  );
}

// <button onClick={()=>handleRemove(id)}>remove</button>
