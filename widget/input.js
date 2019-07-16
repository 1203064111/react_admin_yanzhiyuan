/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';


class EditorComponent extends Component{
    render(){
        return(
            <div className="input_div" style={this.props.style}>
                <div className="title" style={this.props.title_style}>
                    <p1 className="title_p" style={this.props.title_p_style}>*</p1>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <input
                    className="input"
                    style={this.props.input_style}
                    type={this.props.type?this.props.type:"text"}
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    disabled={this.props.disabled?this.props.disabled:""}
                    value={this.props.value?this.props.value:""}
                    onChange={(e)=>{
                        if(this.props.onChange){
                            if(!this.props.checked||this.props.checked===""){
                                this.props.onChange(e.target.value);
                            }else{
                                this.props.onChange(1,e.target.value);
                            }
                        }
                    }}/>
                <input
                    style={{display:!this.props.checked||this.props.checked===""?"none":"flex",marginLeft:this.props.marginLeft?this.props.marginLeft:10}}
                    type="checkbox"
                    checked={this.props.checked+""==='1'?true:false}
                    onClick={()=>{
                        if(this.props.onChange){
                            if(this.props.checked+""==='1'){
                                this.props.onChange(2,"0");
                            }else{
                                this.props.onChange(2,"1");
                            }
                        }
                    }}/>
            </div>
        )
    }
}

module.exports=EditorComponent;