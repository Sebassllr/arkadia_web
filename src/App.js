import React, { Component } from 'react';
import ProjectList from './components/ProjectList'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    };

  }

  componentDidMount() {
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

export default App;
