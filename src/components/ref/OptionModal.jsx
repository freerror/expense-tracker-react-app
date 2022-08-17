import React from "react";
import ReactModal from "react-modal";
import IndecisionApp from "./IndecisionApp.jsx";

const OptionModal = (props) => (
  <ReactModal isOpen={!!props.selectedOption}
    onRequestClose={props.clearSelection}
    contentLabel="Selected Option"
    className="modal"
    appElement={document.getElementById('app') || undefined} >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button className="button" onClick={props.clearSelection}>Sweet</button>
  </ReactModal>
);

export default OptionModal