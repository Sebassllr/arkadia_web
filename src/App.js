import React, { Component } from 'react';
import Project from './Project'
import Sidebar from './components/Sidebar'

const API_URL = 'http://localhost:3001/api'

class App extends Component {
  render() {
    return (
        <div className="container main">
          <div className="columns">      
          <Sidebar />
          <div className="column is-9">
            <section className="hero is-info welcome is-small">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    Hello, Admin.
                            </h1>
                  <h2 className="subtitle">
                    I hope you are having a great day!
                            </h2>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>
      
    );
  }
}

export default App;
