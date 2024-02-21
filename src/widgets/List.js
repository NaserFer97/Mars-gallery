import React, { useState } from "react";

export const inputPlaceholder = "Enter new item";

const List = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setItems(items.concat([newItem]));
    setNewItem("");
  };

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit} data-testid="form">
        <div className="form-group">
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
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
