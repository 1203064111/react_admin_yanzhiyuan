/**
 * Created by shenjiabo on 16/10/13.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var ListView=require('./foreach');

class SearchBar extends  Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectVisible: false,
            data:[],
            selectBean:{},
            name:"",
        };
    }
    render(){
        return(
            <div style={{display:'flex',height:30,alignItems:'center',
                            marginLeft:this.props.marginLeft?this.props.marginLeft:0,
                            marginRight:this.props.marginRight?this.props.marginRight:0}}>
                <div style={{width:this.props.width?this.props.width:(this.props.title?100:0),display:'flex',justifyContent:'flex-end',}}>
                    <p1 style={{display:(this.props.is_must==='true'?"flex":"none"),color:'red',marginLeft:10}}>*</p1>
                    <p1 style={{fontSize:13}}>{this.props.title}</p1>
                </div>
                <div  style={{height:30,background:'#ffffff',marginLeft:10}}>
                    <div style={{height:30,width:this.props.inputWidth?this.props.inputWidth:198,display:'flex'
                        ,flex:1,borderStyle:'solid',borderWidth:2,borderColor:'#efefef',borderRadius:5}}>
                        <input style={{flex:1,outline:'none',border:"none",marginLeft:10}}
                               value={this.props.value?this.props.value+"":""}
                               placeholder={this.props.placeholder?this.props.placeholder:""}
                               onChange={(e)=>{
                                   if(this.props.onChange){
                                       this.props.onChange(e.target.value);
                                   }
                               }}/>
                    </div>
                    <div style={{display:!this.props.dataSource||this.props.dataSource.length<=0?'none':"flex",position:'relative',
                                    left:0,right:0,top:0,flexDirection:'column',}}>
                        <ListView
                            style={{display:'flex',flexDirection:'column',background:'#ffffff',width:this.props.inputWidth?this.props.inputWidth:198,borderStyle:'solid',borderWidth:1,borderColor:'#efefef'}}
                            dataSource={this.props.dataSource}
                            renderRow={(rowID)=>{
                                return(
                                    <div style={{display:'flex',flex:1,flexDirection:'column',}}
                                        onClick={()=>{
                                            if(this.props.onPress){
                                                this.props.onPress(this.props.dataSource[rowID]);
                                            }
                                        }}>
                                        <div style={{display:'flex',alignItems:'center',marginTop:4,marginBottom:4}}>
                                            <p1 style={{fontSize:15,marginLeft:10}}>{this.props.dataSource[rowID][this.props.item_name]}</p1>
                                        </div>
                                        <div style={{background:'#efefef',height:1}}></div>
                                    </div>
                                )
                            }}/>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports=SearchBar;