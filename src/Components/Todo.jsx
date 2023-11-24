import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";

import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState(""); // input Chyunna Data Access Chyan Vendi Ulla State
  const [todos, setTodos] = useState([]); //input Chyunna Data Store Chyan vendi
  const [editId , setEditId] = useState(0); // edit chyan ulla id store chyan vendi an


  //Form Re-render Avathe Irkan Vendi
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //Button Click Chyubol Action Kanikan Vendi
  const addTodo = () => {
   if(todo !== ''){
    setTodos([...todos,{list : todo , id:Date.now() , status : false}]);//id  vechu delect chyan vedni todo array object aytt convert chythu
    console.log(todos);
    //Add Chytht Auto Null Avan vendi
    setTodo("");
   }
   if(editId){
    const editTodo = todos.find((todo)=>todo.id===editId)
    const updateTodo = todos.map((to)=>to.id === editTodo.id ? (to={id : to.id , list : todo})
    : (to = {id : to.id , list : to.list}))
    setTodos(updateTodo);
    setEditId(0);
    setTodo('')
   }
  };

  //Dom Direct Use Chyan Vendi UseRef Use Chym
  //initily namude input Field Focuce Aytt thanne nikanm Athin vendi Use Ref Use Chyum

  const inputRef = useRef("null");

  //initial loading aan nmk input trigger Chyendi ullath athin vendi useEffect Use Chyum;

  useEffect(() => {
    inputRef.current.focus(); //current means ref kodutha full line access Chyum
  });

  //delecte Chyan Ulla code
  const onDelete = (id) =>{
    setTodos(todos.filter((to)=>to.id !== id))
  }

  //complete chyan vendi
  const onComplete = (id) =>{
    let complete = todos.map((list)=>{
      if(list.id === id){
        return ({...list , status : !list.status })
      }
      return list
    })
    setTodos(complete)
  }

  //edit
   const onEdit = (id) =>{
    const editTodo = todos.find((to)=>to.id ===id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
   }
  


  return (
    <div className="container">
      <h2>TODO APP</h2>

      {/* //Form */}

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="input-control"
          onChange={(event) => setTodo(event.target.value)}
        />

        <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
      </form>

      {/* //TODO List Chyan Vendi */}
      {/* Map Chythu */}
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id= {to.status ? 'list-item' : '' } >{to.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-items-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(to.id)}
                />
                <FiEdit className="list-items-icons" id="edit" title="Edit" onClick={()=> onEdit(to.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
