import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config'
import ApiContext from '../ApiContext'
import propTypes from 'prop-types'

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.then(e => Promise.reject(e))
        return res
        })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const modified = formatDate(new Date(this.props.modified));
    return (
        <div  className="Note">      
        <li>
          <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>

          <p>Last modified: {modified}</p>

          <button
            className="deletebtn"
            onClick={this.handleClickDelete}
          >Delete Note</button>
        </li>
        </div>      
    );
  }

}

Note.propTypes = {
    id: propTypes.string,
    name: propTypes.string.isRequired,
    date_modified: function(props, propName, componentName) {
      if (typeof props.modified != 'object' && typeof props.modified != 'string') {
        return new Error('This isn\'t a date')
      }
    },

}

export default Note;
