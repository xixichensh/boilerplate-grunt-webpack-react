import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import ConfirmWindow            from './input_confirmwindow'


let that = null
const container = document.createElement('div')
document.body.appendChild(container)

class ShowConfirmWindow extends Component{
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
        that.setState({ isShow: false });
    }


    render() {
        const { isShow,content,title,buttons } = that.state;

        return( isShow ? <ConfirmWindow content={ content } title={ title } buttons={ buttons } 
            closeMenu={ that.closeMenu.bind(that) } /> : null );
    }
}

ReactDOM.render(<ShowConfirmWindow />, container)


export default function ShowConfirmWindowControl (isShow,content,buttons,title='温馨提示') {

    if(!isShow)
        return false;

    that.setState({ 
        isShow: true,
        content:content,
        title:  title,
        buttons:buttons
    });
}