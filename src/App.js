import React from 'react';
import './App.css';
import Contact from './components/Contact';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color:"red",
    };
  }
  // component Lifecycle
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true / false;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  
  render(){
    return(
      <div className="App">
        <Contact></Contact>
      </div>
    );
  }
}

export default App;
