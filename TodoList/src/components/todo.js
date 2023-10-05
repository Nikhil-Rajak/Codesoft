import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodoList");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return []
    }
}
const Todo = () => {
    const [inputData,setInputData] = useState("");
    const [items , setItems] = useState(getLocalData);
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the item 
    const addItem = ()=>{
        if(!inputData){
            alert("plz fill the data");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id === isEditItem){
                        return {...curElem,name : inputData};
                    }
                    return curElem;
                    
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name:inputData,
            };
            setItems([...items,myNewInputData]);
            setInputData("");
        }
    };

    const deleteItem = (index)=>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        });
        setItems(updatedItems);
    }
    const removeAll = ()=>{
        setItems([]);
    };

    const editItem = (index)=>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    useEffect(()=>{
        localStorage.setItem("mytodoList",JSON.stringify(items));
    },[items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="https://i.ibb.co/5RCLbRg/2023.png" alt="todologo" />
                <figcaption>Add Your List Here ✌️</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍️ Add Item' className='form-control'
                value={inputData} onChange={(event)=>setInputData(event.target.value)} />
                {toggleButton?(<i class="fa-solid fa-pen-to-square add-btn fa" onClick={addItem}></i>)
                :(<i class="fa-solid fa-plus add-btn fa" onClick={addItem}></i>)}
                
            </div>
            {/* show our items */}
            <div className="showItems">
                {
                    items.map((curElem)=>{
                        return (
                            <div className="eachItem" key = {curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i class="fa-solid fa-pen-to-square add-btn" onClick={()=>editItem(curElem.id)} ></i>
                            <i class="fa-solid fa-trash add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                        )
                    })
                }
               
            </div>

            {/* remove All items */}
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text = "Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
