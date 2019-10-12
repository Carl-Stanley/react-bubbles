import React, { useState } from "react";
import { axiosWithAuth } from './axiosWithAuth';




const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
 
   

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    
  };

  const saveEdit = e => {
    e.preventDefault();
  
     
    updateColors(
      colors.map(color => {
        if (color.id === colorToEdit.id) {
          return colorToEdit;
        } else {
          return color;
        }
      })
    );
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("Changed Color", res);
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    updateColors(colors.filter(item => item.id !== color.id));
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log("Removed Color", res);
      })
      .catch(err => console.log("error removing", err.response));
  };

  const addColor = e => {
    e.preventDefault();
    console.log("Color added form: ", colorToAdd);
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => console.log("Added Color"))
      .catch(err => console.log("error on add color", err.response));

    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li
            key={color.id} onClick={() => {editColor(color); 
            }}
          >
            <span>
              <span
                className="delete" onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <h4>Add a new color</h4>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <button id="addButton" type="submit">Add</button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
