import React, { Component } from 'react';
import PropTypes            from    'prop-types';
import Style from './input_alertwindow.less';

class Input_AlertWindow extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        const _this = this; 
        const { closeMenu,content,title } = _this.props;

        return  <div>
                    <div className={ Style.mask } onClick={ closeMenu }></div>
                    <div className={ Style.alert_window_wrapper }>
                        <div className={ Style.window_top_wrapper }>
                            {title==' ' ? null :<h2 className={ Style.top_title_tips }><span>{ title ? title : "温馨提示" }</span></h2> }
                            <div className={ Style.top_content }><span>{ content }</span></div>
                        </div>
                        <div className={ Style.footer_btns }>
                            <p onClick={ closeMenu } ><span>知道了</span></p>
                        </div>
                    </div>
                </div>;

    }
}  

Input_AlertWindow.propTypes = {
    closeMenu:  PropTypes.func,
    content:    PropTypes.any,
    title:      PropTypes.string,
    callback:   PropTypes.func
};

Input_AlertWindow.defaultProps = {
    closeMenu:  ()=>false,
    content:    "",
    title:      "",
    callback:   ()=>false
};

export default Input_AlertWindow;