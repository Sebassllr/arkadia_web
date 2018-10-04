import React, { Component } from 'react';
import ProjectList from './components/ProjectList'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };

    this.getProjects = this.getProjects.bind(this)
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    axios
      .get(`${API_URL}/projects/`)
      .then(res => {
        const { data } = res
        this.setState({
          projects: data,
        })
      })
  }

  render() {
    return (
      <div>
        <ProjectList projects={ this.state.projects } />
      </div>
    );
  }
}

export default Project;
