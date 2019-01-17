import React, { Component }  from "react";
import Note from './Note';
import { FaPlus } from "react-icons/fa";

class Board extends Component {
  state = {
    notes: []
  }

  componentWillMount() {
    var self = this
    if (this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
          .split('. ')
          .forEach(sentence => self.addNote(sentence.substring(0, 25))))
    }
  }

  update = (newText, i) => {
    console.log('updating item', i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

  remove = (id) => {
    console.log('removing at', id)
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  eachNote = (note, i) => {
    return (
      <Note
        key={i}
        index={i}
        onChange={this.update}
        onRemove={this.remove}>
        {note.note}
      </Note>
    )
  }

  addNote = (text) => {
    this.setState( prevState => ({
      notes: [...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }))
  }

  nextId = () => {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  render(){
    return(
      <div className="board">
        <button onClick={this.addNote.bind(null, "New Note")} id="add"><FaPlus /></button>
        { this.state.notes.map(this.eachNote) }
      </div>
    )
  }
}

export default Board;
