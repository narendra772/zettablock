import React from "react";
import apiPut from './../services';
import { useState, useEffect } from "react";
import {modalStyles, changeButton, cancelButton} from './../styles/modules.EditModal';
import $ from 'jquery'; 

const EditModal = ({ canShow, updateModalState, id, description}) => {
  const [newDesc, setNewDesc] = useState(description);
  const [rerend, setRerend] = useState(false);
  const updateDescription = async () => {
    apiPut(id, newDesc);
    updateModalState();
  }
  function rerender(){
    window.location.reload();
 }
 
 $.ajax({
    url:updateDescription(),
    success:function(){
    rerender();
 }
 })
  const handleChange = (e) => {
    setNewDesc(e.target.value);
  }
  if (canShow) {
    return (
      <div style={modalStyles}>
        <h2> Change description for ID number: {id} </h2>
        <input type="text" placeholder={description} onChange={handleChange} /> <br/>
        <button style={changeButton} onClick={updateDescription}>Save Changes</button>
        <button style={cancelButton} onClick={updateModalState}>Cancel</button>
      </div>
    );
  }

  return null;
};

export default EditModal;