/**
 * Created by shenjiabo on 16/10/19.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';


class ButtonComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    render(){
        return(
            <div className="button" style={this.props.style}
                    onClick={()=>{
                        if(this.props.onClick){
                            this.props.onClick();
                        }
                    }}>
                <p1 className="p" style={this.props.p_style}>{this.props.value}</p1>
            </div>
        )
    }
}


module.exports=ButtonComponent;