import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext'
import {findNote} from '../notes-helpers'
class NotePageMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <div className="Main">
        <Note modified={this.props.modified} id={this.props.id } name={this.props.name} onDeleteNote={this.handleDeleteNote} />
        <p>{this.props.content}</p>
      </div>
    );
  }

}

export default NotePageMain;
