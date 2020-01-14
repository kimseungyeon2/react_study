import React from 'react';
import './App.css';
import Contact from './components/Contact';

class App extends React.Component {
  constructor(props){
    //component가 처음 만들어질 때 실행 된다. 기본 state를 설정 할 수 있다.
    super(props);
    this.state = {
      color:"red",
    };
  }
  // component Lifecycle
  componentWillMount() {
    //component가 DOM 위에 만들어지기 전에 실행
    console.log('componentWillMount');
  }
  componentDidMount() {
    //첫 랜더링 을 만치고 실행됨 (이 안에서 다른 자바스크립트 프레임 워크 연동 및 setTimeout, setInterval 및 AJAX사용)
    console.log('componentDidMount');
  }
  componentWillReceiveProps(nextProps) {
    //component 가 props를 새로 받을 때 실행됨 props에 따라 state를 업데이트 할 때 사용하면 유용, 이 안에서 setState를 해되 괜찮음
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate(nextProps, nextState) {
    /*
      props/state 가 변경되었을 때 RE랜더링을 할지말지 정한다.
      실제로 사용 할 때는 필요한 비교를 하고 값을 반환해야 한다.
      ex)
        return nextProps.id !== this.props.id
        JSON.stringify 를 사용하여 여러 field를 편하게 비교 가능
        이로인해 불필요한 작업을 막아줌
    */
    console.log('shouldComponentUpdate');
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    //컴포넌트 업데이트 전 실행 여기서 setState를 절대 사용하지 말것 이유 :무한루프
    console.log('componentWillUpdate');
  }
  componentDidUpdate(prevProps, prevState) {
    //컴포넌트가 RE랜더링을 마친 후 실행된다. 여기서도 setState를 사용 하지 말것.
    console.log('componentDidUpdate');
  }
  componentWillUnmount() {
    //컴포넌트가 DOM에서 사리진 후 실행된다.
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
