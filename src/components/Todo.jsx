import { useEffect, useState } from "react";
// import localStorage from "localStorage";

const getLocalStorage = () => {
  let list = localStorage.getItem("data");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("data")));
  } else {
    return [];
  }
};
const Todo = () => {
  const [data, setData] = useState("");
  const [todoData, setTodoData] = useState(getLocalStorage());
  const [editing, setEditing] = useState({});
  const inputHandler = (e) => {
    setData(e.target.value);
  };
  const addHandler = () => {
    console.log("clicked..");
    if (data !== "") {
      setTodoData([...todoData, data]);
      setData("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todoData));
  }, [todoData]);

  console.log(localStorage.getItem("data"));

  const deleteBtn = (index) => {
    const newArr = todoData.filter((_, id) => index !== id);
    setTodoData(newArr);
  };
  const editBtn = (obj) => {
    setData(obj.data);
    setEditing(obj);
  };
  const editHandler = () => {
    let arr = todoData;
    if (data !== "") {
      arr[editing.id] = data;
    }
    setTodoData([...arr]);
    setData("");
    setEditing({});
  };

  return (
    <div className="todo_wrapper">
      <div className="inputs">
        <div className="input_area">
          <div className="input_area_field">
            <input
              type="text"
              value={data}
              onChange={inputHandler}
              onKeyUp={(id) => {
                if (id?.key === "Enter") {
                  addHandler();
                }
              }}
            />
            <button
              className="add_btn"
              onClick={editing.data ? editHandler : addHandler}
            >
              {editing.data ? "update" : "Add"}
            </button>
          </div>
          <div className="todoItems">
            {todoData.map((items, index) => {
              return (
                <div className="all_todo" key={index}>
                  <div>
                    {index + 1}.{items}{" "}
                  </div>
                  <div>
                    <button className="delBtn" onClick={() => deleteBtn(index)}>
                      Del
                    </button>{" "}
                    <button
                      className="editBtn"
                      onClick={() => {
                        let obj = { id: index, data: items };
                        editBtn(obj);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
