/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';

class SelectComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state={
        }
    }
    render(){
        var is_have=false;
        let view=[];

        if(this.props.dataSource){
            for(let i=0;i<this.props.dataSource.length;i++){
                if(this.props.init_value+""===this.props.dataSource[i][this.props.select_value]+""){
                    view.push(<option selected="selected" className="option">{this.props.dataSource[i][this.props.show_value]}</option>);
                }else{
                    view.push(<option className="option">{this.props.dataSource[i][this.props.show_value]}</option>);
                }
            }
        }
        return(
            <div style={{display:!this.props.visible||this.props.visible==='true'?'flex':"none",height:50, alignItems:'center'
                        ,marginTop:this.props.marginTop?this.props.marginTop:0,marginRight:this.props.marginRight?this.props.marginRight:0}}>
                <div style={{width:this.props.width?this.props.width:100,display:this.props.title?"flex":'none',justifyContent:'flex-end',}}>
                    <p1 style={{display:(this.props.is_must==='true'?"flex":"none"),color:'red',marginLeft:10}}>*</p1>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <select
                    style={{marginLeft:10,width:this.props.selectWidth?this.props.selectWidth:"auto"
                        ,height:this.props.selectHeight?this.props.selectHeight:"auto",fontSize:10}}
                    ref="select"
                    onChange={()=>{
                        this.props.onChange(this.refs.select.selectedIndex);
                    }}>
                    {view}
                </select>
            </div>
        )
    }
}

const styles = {
    tab:{
        display:'flex',
        height:50,
        alignItems:'center',
    },
    tabTitle:{
        width:100,
        display:'flex',
        justifyContent:'flex-end',
    },
    input:{
        width:200,
        marginLeft:10,
        height:30,
        paddingLeft:10
    },
    font:{
        fontSize:13,
    },
    button:{
        paddingLeft:20,
        paddingRight:20,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        background:'blue'
    },
    buttonFont:{
        fontSize:15,
        color:'#ffffff'
    },
}

module.exports=SelectComponent;