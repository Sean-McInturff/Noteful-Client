import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import {findNote, findFolder} from '../notes-helpers'

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className="Sidebar">
        <Link to='/'>Go Back</Link>
        <h2 className="CurrentFolder">Current Folder: {this.props.name}</h2>
      </div>
    );
  }

}

export default NotePageNav;
