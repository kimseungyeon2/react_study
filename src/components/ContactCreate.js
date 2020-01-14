import React from 'react';
import Contact from './Contact';

export default class ContactCreate extends React.Component {
    constructor(props){
        /*
            React.Component 에서 this.props에 초기 설정을 위해 super(props); 설정
        */
        super(props);
        this.state = {
            name:'',
            phone:'',
        };
    }
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleClick = (e) => {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };
        this.props.onCreate(contact);
        this.setState({
            name: '',
            phone: '',
        })
        /*
            React 에서 DOM에 직접적인 접근을 해야 할때 ref 를 이요하면 편함
            보통 document.getElmentById('id') 를 이용해서 하거나 함
            하지만 React 는 component 를 여러개 불러와서 화면을 구성 ID가 중첩될 수 있음
            그래서
            React 에서는 ref 를 이용해서 더욱 확실 하게 DOM에 접근 할 수 있음.
        */
        this.nameInput.focus();
    }
    handleKeyPress = (e) => {
        if(e.charCode === 13&&this.state.name&&this.state.phone){//Enter
            this.handleClick();
        }
    }
    render(){
        return(
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress} 
                        ref={(ref) => {this.nameInput = ref}}
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <button onClick={this.handleClick}>Create</button>
                </p>
            </div>
        );
    }
}

