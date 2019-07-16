/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';

class TextComponent extends Component{
    render(){
        return(
            <div style={{display:!this.props.visible||this.props.visible==='true'?'flex':"none",alignItems:'center',
                        marginLeft:this.props.marginLeft?this.props.marginLeft:0,
                        marginTop:this.props.marginTop?this.props.marginTop:0}}>
                <div style={{width:this.props.titleWidth?this.props.titleWidth:100,display:this.props.title?'flex':"none",justifyContent:'flex-end',}}>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <div style={{ width:this.props.width?this.props.width:200,minHeight:25,display:'flex'
                    ,alignItems:"center", borderStyle:'solid',
                    borderWidth:1,borderColor:'#efefef',marginLeft:10,padding:4,borderRadius:5,
                    wordWrap:"break-word",wordBreak:"break-all"}}>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.value}</p1>
                </div>
            </div>
        )
    }
}
module.exports=TextComponent;
