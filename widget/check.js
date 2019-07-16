/**
 * Created by shenjiabo on 16/10/18.
 * 默认不显示
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';

class CheckComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            checked:this.props.checked,
        };
    }
    render(){
        return(
            <div style={{ display:this.props.visible==='true'?'flex':"none",
                        height:40,alignItems:'center'}}>
                <input
                    style={{marginLeft:this.props.marginLeft?this.props.marginLeft:10}}
                    type="checkbox"
                    checked={this.props.checked+""==='1'?true:false}
                    onClick={()=>{
                           if(this.props.onClick){
                                if(this.props.checked+""==='1'){
                                    this.props.onClick("0");
                                }else{
                                    this.props.onClick("1");
                                }
                           }
                       }}/>
                <p1 className="p_000000" style={{marginLeft:5}}>{this.props.title}</p1>
            </div>
        )
    }
}



module.exports=CheckComponent;
