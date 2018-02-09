import React, { Component } from 'react';
import StyleClass           from './input_iscrollbox.less';

class Input_IscrollBox extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };
    render() {
        const _this = this;
        const { children,height,handleScroll,maxHeight } = _this.props;

        return  <section className={ StyleClass.iscroll_box } onScroll={ handleScroll } style={{ height:height,maxHeight:maxHeight }}>
                    <div className={ StyleClass.content }>{ children ? React.cloneElement( children, {}): null }</div>
                </section>;
    }
}

export default Input_IscrollBox;