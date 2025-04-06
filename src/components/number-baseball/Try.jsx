import { Component } from "react";


class Try extends Component {
    render(){
        // const {value,index} = this.props;
        return (
            <li>
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨텐츠1 </div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
                <div>컨텐츠4</div>
                <div>컨텐츠5</div>
            </li>
        )
    }
}

export default Try;