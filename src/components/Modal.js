import React from "react";
import {modalStyles} from '../styles/modules.Modal.js'

const Modal = ({ canShow, updateModalState, name, createdAt, updatedAt, description, type, id, operationName, variables, query }) => {
  if (canShow) {
    return (
      <div style={modalStyles}>
        <h2> API Name: {name} </h2>
        <p> Created At: {createdAt} </p>
        <p> Updated At: {updatedAt} </p>
        <p> Description: {description} </p>
        <p> Type: {type} </p>
        <p> ID: {id} </p>
        <p> Operation Name: {operationName} </p>
        <p> Variables: {variables} </p>
        <p> Query: {query} </p>
        <button onClick={updateModalState}>Hide Details</button>
      </div>
    );
  }

  return null;
};

export default Modal;