import React, { useReducer } from "react";

export const inputPlaceholder = "Add new item";

export const defaultState = {
  newItem: "",
  items: []
};

export const listReducer = (state, action) => {
  switch (action.type) {
    case "newItemChange":
      return {
        ...state,
        newItem: action.value
      };

    case "add":
      return {
        newItem: "",
        items: [...state.items, state.newItem]
      };

    default:
      return state;
  }
};

const List = () => {
  const [state, dispatch] = useReducer(listReducer, defaultState);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "add" });
    dispatch({ type: "newItemChange", value: "" });
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {state.items.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit} data-testid="form">
        <div className="form-group">
          <input
            type="text"
            value={state.newItem}
            onChange={e =>
              dispatch({ type: "newItemChange", value: e.target.value })
            }
            id="newItem"
            placeholder={inputPlaceholder}
            className="form-control"
          />
        </div>
        <input type="submit" value="add" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default List;
