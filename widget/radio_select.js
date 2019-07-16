/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class RadioSelectComponent extends Component{
    render(){
        return(
            <div style={{display:!this.props.visible||this.props.visible==='true'?'flex':"none",height:30,alignItems:'center',
                marginLeft:this.props.marginLeft?this.props.marginLeft:0,
                marginRight:this.props.marginRight?this.props.marginRight:0,
                marginTop:this.props.marginTop?this.props.marginTop:0}}>
                <div style={{width:this.props.width?this.props.width:(this.props.title?100:0),display:'flex',justifyContent:'flex-end',}}>
                    <p1 style={{display:(this.props.is_must==='true'?"flex":"none"),color:'red'}}>*</p1>
                    <p1 className='p_000000'>{this.props.title}</p1>
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:this.props.value+""==="1"?"flex-end":""
                            ,width:40,height:25,background:this.props.value+""==="1"?"#1ABC9C":'RGB(204,204,204)'
                            ,marginLeft:10,borderRadius:20}}
                            onClick={()=>{
                                if(this.props.value+""==="1"){
                                    this.props.onClick("0");
                                }else{
                                    this.props.onClick("1");
                                }
                            }}>
                    <div style={{width:15,height:15,background:'#ffffff',marginLeft:5,marginRight:5,borderRadius:15}}>

                    </div>
                </div>
            </div>

        )
    }
}

module.exports=RadioSelectComponent;