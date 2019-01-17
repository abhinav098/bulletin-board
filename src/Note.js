import React, { Component } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { throws } from 'assert';


class Note extends Component{
  state = {
    editing: false
  }

  componentDidUpdate(){
    console.log('component Updated')
    var textarea
    if (this.state.editing) {
      textarea = this._newText
      textarea.focus()
      textarea.select()
    }
  }

  componentWillMount(){
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150 , 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    let shouldUpdate = this.props.children !== nextProps.children || this.state !== nextState
    return shouldUpdate
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
    return <div className="note" style={this.style}>
      <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}
          defaultValue={this.props.children}/>
          <button id="save">
            <FaSave />
          </button>
        </form>
      </div>;
  }

  save = (e) => {
    e.preventDefault();
    this.props.onChange(this._newText.value, this.props.index);
    this.setState({
      editing: false
    })
  }

  remove = () => {
    this.props.onRemove(this.props.index);
  }

  randomBetween = (x, y, s) => {
    return x + Math.ceil(Math.random() * (y-x)) + s
  }

  renderDisplay = () => {
    return ( < div className = "note"
        style = {
          this.style
        } >
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
