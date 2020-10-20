import React, { Component } from 'react'
import Form from '../Form/form'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'

export default class AddFolder extends Component {
  static contextType = ApiContext;

  constructor(){
    super()
    this.state = {
      foldername: {
        name:'',
        touched: false,
        success:''
      }
    }
  }

  handleNameChange(fname){
    this.setState({foldername:{name: fname, touched:true}})
  }


  handleValidation(){
    const name= this.state.foldername.name.trim();
    let checkName = this.context.folders.filter(folder => name === folder.name)

    if(name.length===0){
      return "Name is required"
    } else if (name.length < 3) {
      return "Name must be at least 3 characters"
    }
    if(checkName.length!==0){
      return "Sorry, that folder name is taken."
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(folder)

  })
      .then(res => {
          if (res.ok) {
              return res.json();

          } else {
              return Promise.reject('Unable to fetch');
          }
      })
      .then(folder => {
          this.context.AddFolder(folder)
          this.props.history.push('/');

      })
      .catch(err => console.log(err));

      this.setState({foldername:{success: `New folder: "${this.state.foldername.name}"`}})
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <Form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name:
            </label> <br/>
            <input type='text' id='folder-name-input' name='folder-name' onChange= {(e) => this.handleNameChange(e.target.value)} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
            {this.state.foldername.touched && <ValidationError message={this.handleValidation()} />}
              <section className="success"><p>{this.state.foldername.success}</p></section>
          </div>
        </Form>
      </section>
    )
  }
}