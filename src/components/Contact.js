import React from 'react';
import ContactInfo from './Contactinfo';
export default class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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
    }
    handleChange = (e) => {
        this.setState({
            keyword:e.target.value
        });
    }
    render(){
        const mapToComponents = (data) =>{
            data.sort();//sort 
            data = data.filter((contact) =>{
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });

            return data.map((contact,i) =>{
                return (<ContactInfo contact={contact} key={i}></ContactInfo>);
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
            </div>
        );
    }
}