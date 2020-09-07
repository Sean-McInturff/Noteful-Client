import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import {countNotesForFolder} from '../notes-helpers'

class NoteListNav extends React.Component {
  static contextType = ApiContext;
  
  render() {
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul>

          {this.props.folders.map((folder) => {

            const classes = this.props.selected === folder.id
              ? 'folder selected'
              : 'folder'

            return(

              <li key={folder.id}>
                <Link className={classes} to={`/folders/${folder.id}`}>{folder.name}</Link>
              </li>
            )
          })}
        </ul>
        <Link to='/Add-Folder' className="AddFolderButton">
           Add New Folder
          </Link>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;
