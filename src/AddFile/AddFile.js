
import React, { Component } from 'react'
import Form from '../Form/form'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError';

export default class AddNote extends Component {
  static contextType = ApiContext;

    constructor() {
      super();
      this.state ={
        title: {
          name :'',
          touched:false
        },
        folder_name:'',
        content: {
          noteContent:'',
          touched: false
        },
        success: ''
      }
    }

    handleTitle(title) {
      this.setState({title: {name: title, touched: true} });
    }

    handleContent(content) {
      this.setState({content: {noteContent: content, touched:true} })
    }
    handleNoteFolder(f) {

      this.setState({ folder_name: f});
    }

    handleTitleValidation() {
      const name = this.state.title.name.trim();
      let CheckName = this.context.notes.filter(note => name === note.name);

      if (name.length === 0) {
        return "Name is required";
      } else if (name.length < 3) {
        return "Name must be at least 3 characters";
      }
      if (CheckName.length !==0) {
        return "Sorry, that note name is taken"
      }
    }

    handleContentValidation() {
      const content = this.state.content.noteContent

      if(content.length===0){
        return "Note cannot be blank"
      }
    }

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
      this.setState({success: `New Note: "${this.state.title.name}"`})
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label> <br/>
            <input type='text' id='note-name-input' name='note-name' required = {true} onChange={e => this.handleTitle(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label> <br/>
            <textarea id='note-content-input' name='note-content' required={true} onChange={e => this.handleContent(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Select Folder
            </label> <br />
            <select id='note-folder-select' name='note-folder-id'  required={true} onChange={e => this.handleNoteFolder(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
            {this.state.title.touched && (
              <ValidationError message = {this.handleTitleValidation()} />
            )}
            {this.state.content.touched && (
              <ValidationError message = {this.handleContentValidation()} />
            )}

            <section className="success"><p>{this.state.success}</p></section>
          </div>
        </Form>
      </section>
    )
  }
}