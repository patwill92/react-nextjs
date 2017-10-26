import React, {Component} from 'react'
import axios from 'axios'

import Head from '../components/Head'

class App extends Component {
  static getInitialProps({req, query: {data}}) {
    return {
      data
    };
  }

  state = {
    list: null
  };

  componentDidMount = async () => {
    console.log(this.props);
    let {data} = await axios.get('/api/menu/main');
    this.setState({
      list: data
    })
  };

  render() {
    let serverList = this.props.data.map((item, i) => {
      return (
        <li key={i}>{item.name}</li>
      )
    });

    let clientList = this.state.list ? this.state.list.map((item, i) => {
      return (
        <li key={i}>{item.name}</li>
      )
    }): '';
    return (
      <Head title='Home'>
        <div>
          <h1>Server Data</h1>
          <ul>
            {serverList}
          </ul>
          <h1>Client Data</h1>
          <ul>
            {clientList}
          </ul>
        </div>
      </Head>
    )
  }
}

export default App;