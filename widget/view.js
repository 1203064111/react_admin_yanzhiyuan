/**
 * Created by shenjiabo on 16/12/2.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';

class ViewComponent extends Component{
    render(){
        return(
            <div  style={{display:!this.props.visible||this.props.visible==='true'?'flex':"none",
                marginLeft: this.props.marginLeft?this.props.marginLeft:10,
                marginRight: this.props.marginRight?this.props.marginRight:10,
                marginTop:this.props.marginTop?this.props.marginTop:20,minHeight:40,
                flexDirection:this.props.flexDirection?this.props.flexDirection:"row",alignItems:'center'
                ,background:this.props.background?this.props.background:'RGB(245,250,254)'}}>
                {this.props.children}
            </div>
        )
    }
}


module.exports=ViewComponent;