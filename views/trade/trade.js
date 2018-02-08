import Style                from "./trade.less";

export default class extends Component{
	constructor(props){
        super(props);
        const _this = this;
		_this.state = { currentHeight:$.height() }
    }

    render(){
        const { currentHeight } = this.state;
        return (<div>123</div>);
    }
}