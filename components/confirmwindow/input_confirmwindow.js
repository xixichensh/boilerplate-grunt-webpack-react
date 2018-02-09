import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Style                from './input_confirmwindow.less';
import IscrollBox           from 'iscrollbox/input_iscrollbox';

class Input_ConfirmWindow extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        const _this = this; 
        const { closeMenu,content,title,buttons } = _this.props;

        return  <div>
                    <div className={ Style.mask } onClick={ closeMenu }></div>
                    <div className={ Style.alert_window_wrapper }>
                        <div className={ Style.window_top_wrapper }>
                        {title==' ' ? null : <h2 className={ Style.top_title_tips }><span>{ title }</span></h2> }                            
                            <IscrollBox maxHeight={ 336  }>
                                <p className={ Style.top_content }><span dangerouslySetInnerHTML={{ __html:content }}></span></p>
                            </IscrollBox>
                        </div>
                        <div className={ Style.footer_btns }>
                            {
                                buttons.map((item,i)=>{
                                    const { txt,callback,txtColor="inherit" } = item;
                                    return <p key={ i } style={{ color:txtColor }} onClick={()=>{
                                        closeMenu();
                                        callback();
                                    }}><span>{ txt }</span></p>;
                                })
                            }
                        </div>
                    </div>
                </div>;

    }
}  

Input_ConfirmWindow.propTypes = {
    closeMenu:  PropTypes.func,
    content:    PropTypes.any,
    title:      PropTypes.string,
    buttons:    PropTypes.array
};

Input_ConfirmWindow.defaultProps = {
    closeMenu:  ()=>false,
    content:    "",
    title:      "",
    buttons:    []
};

export default Input_ConfirmWindow;