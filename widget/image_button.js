/**
 * Created by shenjiabo on 16/10/19.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';
import Upload from 'rc-upload';

class ButtonComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state={
            id:"pic"+uuid(10,100),
            upload:"upload"+uuid(10,100)
        }
    }
    render(){
        return(
            <div style={{display:'flex',height:20,marginLeft:this.props.marginLeft?this.props.marginLeft:'10',marginRight:this.props.marginRight?this.props.marginRight:'10'}}>
            <form id={this.state.upload} enctype="multipart/form-data" method="post">
                <label style={{width:70,borderRadius: 3,color:'#fff', padding: '5px 15px',background:'#1abc9c' }} for={this.state.id} onClick={()=>{
                    var pic = document.getElementById(this.state.id);
                    pic.click();
                }}>{this.props.value1?this.props.value1:"上传"}</label>
                <input style={{width:1,height:1,opacity:0}} type="file"
                       name="file"
                       id={this.state.id}
                       onChange={()=>{
                           var form = document.getElementById(this.state.upload),
                               formData = new FormData(form);
                           $.ajax({
                               url:this.props.url,
                               type:"post",
                               data:formData,
                               processData:false,
                               contentType:false,
                               success:function(res){
                                   if(res){
                                       if(this.props.onSuccess){
                                           if(res.status==="error"){
                                               layui.use('layer', function () {
                                                   var layer = layui.layer;
                                                   layer.msg(res.error + "");
                                               })
                                               return;
                                           }
                                           this.props.onSuccess(res.data);
                                       }
                                   }
                               }.bind(this),
                               error:function(err){
                                   layui.use('layer', function () {
                                       var layer = layui.layer;
                                       layer.msg(err + "");
                                   })
                               }
                           })
                       }}/>
            </form>
            </div>
        )
    }
}


module.exports=ButtonComponent;