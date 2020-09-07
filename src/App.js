import React from 'react';
import './App.css';
import config from './config'
import ApiContext from './ApiContext'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Link } from 'react-router-dom';
import AddFolder from './AddFolder/AddFolder';
import AddFile from './AddFile/AddFile'
import ErrorBoundary from './ErrorBoundary'


class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
    ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
}

handleDeleteNote = noteId => {
  this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
  });
};

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
  };
    return (
      <ApiContext.Provider value = {value}>
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>

        <aside>
          <Route
            exact
            path='/'
            render={() =>
              <NoteListNav folders={this.state.folders} />
            }
          />
          <ErrorBoundary>
          <Route
            exact
            path='/folders/:folderId'
            render={(props) =>

              <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
            }
          />
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {

              const selectedFolderId = this.state.notes.find(
                note => note.id === props.match.params.noteId
              ).folderId

              const selectedFolder = this.state.folders.find(
                folder => folder.id === selectedFolderId
              )

              return (
                <NotePageNav {...selectedFolder} />
              )
            }}
          />
          </ErrorBoundary>
        </aside>


        <main>
          <Route
            exact
            path='/'
            render={() =>
              <NoteListMain notes={this.state.notes} />
            }
          />
          <ErrorBoundary>
          <Route
            exact
            path='/folders/:folderId'
            render={(props) => {
              return (
                <NoteListMain
                  notes={this.state.notes.filter(
                    note => note.folderId === props.match.params.folderId
                  )}
                />
              )
            }}
          />

          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              
              const selectedNote = this.state.notes.find(
                note => note.id === props.match.params.noteId
              )
              return (
                <NotePageMain {...selectedNote}/>
              )
            }}
          />
          <Route 
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddFile}
            />
          </ErrorBoundary>
        </main>
      </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
