/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var qiniu = require('qiniu-js')
class ImgComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state={
            id:"pic"+uuid(10,100),
            upload:"upload"+uuid(10,100),
            width1:0,
            width2:60
        }
    }
    render(){
        return(
            <div className="input_div" style={this.props.style}>
                <div className="title" style={this.props.title_style}>
                    <p1 className="title_p" style={this.props.title_p_style}>*</p1>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <form id={this.state.upload} enctype="multipart/form-data" method="post">
                    <input type="file"
                           name="file"
                           id={this.state.id}
                           style={{display:"none"}}
                           onChange={()=>{
                               {/*var form = document.getElementById(this.state.upload),*/}
                                   {/*formData = new FormData(form);*/}
                               {/*$.ajax({*/}
                                   {/*url:this.props.url,*/}
                                   {/*type:"post",*/}
                                   {/*data:formData,*/}
                                   {/*processData:false,*/}
                                   {/*contentType:false,*/}
                                   {/*success:function(res){*/}
                                       {/*if(res){*/}
                                           {/*if(this.props.onSuccess){*/}
                                               {/*if(res.status==="error"){*/}
                                                   {/*layui.use('layer', function () {*/}
                                                       {/*var layer = layui.layer;*/}
                                                       {/*layer.msg(res.error + "");*/}
                                                   {/*})*/}
                                                   {/*return;*/}
                                               {/*}*/}
                                               {/*this.props.onSuccess(res.data);*/}
                                           {/*}*/}
                                       {/*}*/}
                                   {/*}.bind(this),*/}
                                   {/*error:function(err){*/}
                                       {/*layui.use('layer', function () {*/}
                                           {/*var layer = layui.layer;*/}
                                           {/*layer.msg(err + "");*/}
                                       {/*})*/}
                                   {/*}*/}
                               {/*})*/}

                               $.post(member_homeurl+"memberInterfaces/v1.0/getQiniuToken",{id:1}, function(data) {
                                   var response =data;

                                   if (response.status === 'ok') {
                                       let file = document.getElementById(this.state.id).files[0];

                                       let key = file.name;

                                       var observable = qiniu.upload(file, key, response.data, {},{
                                           useCdnDomain: true,
                                           region: qiniu.region.z0
                                       })
                                       var subscription = observable.subscribe((response)=>{
                                           this.setState({
                                               width1:60*parseFloat(response.total.percent)/100
                                           })
                                       }, (err)=>{
                                           var layer = layui.layer;
                                           layer.msg(err.message + "");
                                       }, (res)=>{
                                           if(this.props.onSuccess){
                                               this.props.onSuccess(res.key)
                                           }
                                       })
                                   } else if (response.status === 'error') {
                                       var layer = layui.layer;
                                       layer.msg(response.error + "");
                                   }

                               }.bind(this));
                           }}/>
                    <video src={this.props.src}
                         className="img"
                         poster={this.props.poster}
                         style={this.props.img_style}
                         onClick={()=>{
                             if(this.props.isClose!=="1"){
                                 this.setState({
                                     width: 0
                                 })
                                 var pic = document.getElementById(this.state.id);
                                 pic.click();
                             }
                         }}/>

                </form>

            </div>
        )
    }

}

const styles = {
    tab:{
        display:'flex',
        alignItems:'center',
    },
    tabTitle:{
        width:100,
        display:'flex',
        justifyContent:'flex-end',
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

module.exports=ImgComponent;