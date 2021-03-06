import React from 'react';

export default class ContactDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: '',
        };
    }
    handleToggle = () => {
        if(!this.state.isEdit){
            this.setState({
                name:this.props.contact.name,
                phone:this.props.contact.phone
            })
        } else {
            this.handleEdit();
        }
        //this.setState 는 비동기
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone);
    }
    handleKeyPress = (e) => {
        //e.charCode === 13 Enter
        if(e.charCode === 13&&this.state.name&&this.state.phone){
            this.handleToggle();
        }
    }
    render(){
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        );
        const view = this.state.isEdit ? edit : details;
        const blank = (<div>Not Selected</div>);
        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ?'OK': 'Edit'}
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}
// 선택을 안했을때 오류가 나지 않도록 default 값 설정
ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: '',
    },
    onRemove: () => { console.error('onRemove not defined');},
    onEdit: () => { console.error('onEdit not defined');}
}
