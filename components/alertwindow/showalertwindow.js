import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import AlertWindow          from './input_alertwindow'


let that = null
const container = document.createElement('div')
document.body.appendChild(container)

class ShowAlertWindow extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow:false
        };
        that = this;
    }
    
    componentWillUnmount() {
        document.removeChild(container)
    }

    closeMenu(){
        const {callback} = that.state;
        that.setState({ isShow: false },()=>callback());
    }


    render() {
        const { isShow,content,title } = that.state;

        return( isShow ? <AlertWindow content={ content } title={ title } closeMenu={ that.closeMenu.bind(that) } /> : null );
    }
}

ReactDOM.render(<ShowAlertWindow />, container)


export default function ShowAlertWindowControl (isShow,content,title="温馨提示",callback=()=>false) {

    if(!isShow)
        return false;

    that.setState({ 
        isShow:     true,
        content:    content,
        title:      title,
        callback:   callback
    });
}