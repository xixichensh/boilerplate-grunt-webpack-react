import common               from "common";

import RequestModel         from 'requestmodel';
const requestModel =        new RequestModel();

import Trade                from './trade';

let that = null;

class ShowTrade extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        that = this;
    }

    render() {
        const { isShow } = this.state;
        const props = {};
        return isShow ? <Trade { ...props } /> : null;
    }
}

export default async function ShowControl (isShow,viewId) {

    if(!isShow || (that && that.state && that.state["isShow"])) return false;
    ReactDOM.render(<ShowTrade />, document.getElementById(viewId));
    that.setState({ isShow : true });
}
