import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {this.props.notes.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id } name={note.name} />
            )
          })}
        </ul>
        <Link to='/add-note'>
        <button className="newNotebtn">New Note</button>
        </Link>
      </div>
    );
  }
}

NoteListMain.propTypes = {
  match: propTypes.object,
  history: propTypes.object
}

export default NoteListMain;
