import React from 'react';
// 배열이나 객체 수정/추가/삭제를 용이하기 위한 리액트 module.
import update from 'react-addons-update';
// components
import ContactInfo from './Contactinfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedKey: -1,
            keyword:'',
            contactData: [
                {
                    name:'Abet',
                    phone: '010-0000-0001'
                },
                {
                    name:'Betty',
                    phone: '010-0000-0002'
                },
                {
                    name:'Charlite',
                    phone: '010-0000-0003'
                }, 
            ]
        };

        /*
            bind 해주는 이유?
            bind 함수는 bind하는 함수에서 사용하는 this의 대상을 지정해주는 역할

            -왜? this의 대상을 지정 해줘야 하나?-

            JavaScript 의 This는 해당 객체를 가르키는것이 아님
            실행시 의 문맥을 가르킴 <- 실행할때 그 This가 어디를 가르키는지 보면 됨
            ex)
            const a = function(){
                console.log(this);
            }
            a() <- window or strict 모드에서는 undefined
            a.testfunc = function(){
                console.log(this);
            }
            a.testfunc() <- a를 가르킴

            기타 해결방법
            Allow function 을 사용한다 Allow function의 this는 부모함수 의 This 를 상속받기 때문에 항상같음.
        */
        // this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
        const contactData = localStorage.contactData;
        if(contactData){
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(JSON.stringify(prevState.contactData)!= JSON.stringify(this.state.contactData)){
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
    handleChange = (e) => {
        this.setState({
            keyword:e.target.value
        });
    }
    handleClick = (key) => {
        this.setState({
            selectedKey: key
        });
    }
    handleCreate = (contact) => {
        // 생성
        this.setState({
            contactData: update(this.state.contactData,{$push: [contact]})
        });
    }
    handleRemove = () => {
        // 삭제
        if(this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,{$splice: [[this.state.selectedKey,1]]}),
            selectedKey: -1
        });
    }
    handleEdit = (name,phone) => {
        // 수정
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]:{
                        name: {$set: name},
                        phone: {$set: phone}
                    }
                }
            )
        });
    }
    render(){
        const mapToComponents = (data) =>{
            data.sort();//sort 
            data = data.filter((contact) =>{
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });

            return data.map((contact,i) =>{
                return (<ContactInfo 
                    contact={contact} 
                    key={i}
                    /*
                        Allow method 를 이용해서 매개변수 전달
                        다른방법
                        this.method.bind(this,parameter);
                    */ 
                    onClick={() => this.handleClick(i)}
                ></ContactInfo>);
            });
        };

        return(
            <div>
                <h1>Contacts</h1>
                <input
                    type="text"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={(this.state.selectedKey != -1)?true:false}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                ></ContactDetails>
                <ContactCreate
                // () 없이 그 함수 그자체를 전달 ,왜?, 랜더링 되면서 함수가 실행됨
                    onCreate={this.handleCreate}
                ></ContactCreate>
            </div>
        );
    }
}