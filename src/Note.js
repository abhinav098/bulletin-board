import React, { Component } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { throws } from 'assert';


class Note extends Component{
  state = {
    editing: false
  }

  // Other way of binding the methods and defining state

  // constructor(props){
  //  super();
  //  this.state = {
  //    editing: false
  //  }
  //  this.edit = this.edit.bind(this);
  //  this.remove = this.remove.bind(this);
  //  this.renderDisplay = this.renderDisplay.bind(this);
  //  this.renderForm = this.renderForm.bind(this);
  // }

  edit = () => {
    this.setState({ editing: true });
  }

  renderForm = () => {
    return <div className="note">
      <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}/>
          <button id="save">
            <FaSave />
          </button>
        </form>
      </div>;
  }

  save = (e) => {
    debugger
    e.preventDefault();
    this.props.onChange(this._newText.value, this.props.index);
    this.setState({
      editing: false
    })
  }

  remove = () => {
    this.props.onRemove(this.props.index);
  }

  renderDisplay = () => {
    return (<div className="note">
        <p>{this.props.children}</p>
        <span>
          <button id="edit" onClick={ this.edit }>
            <FaPencilAlt />
          </button>
        <button id="remove" onClick={ this.remove }>
            <FaTrashAlt />
          </button>
        </span>
    </div>);
  }

  render(){
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

export default Note;
