/**
 * Created by shenjiabo on 16/8/23.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var Widget=require('./../widget/widget');

class LoginComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.enter = this.enter.bind(this)
        this.state = {
            system_account:"",
            system_password:"",
            code:""
        };
    }

    // 构造
    componentDidMount(){
        document.addEventListener("keyup",this.enter)
        var config = {
            vx: 4,	//小球x轴速度,正为右，负为左
            vy: 4,	//小球y轴速度
            height: 2,	//小球高宽，其实为正方形，所以不宜太大
            width: 2,
            count: 200,		//点个数
            color: "121, 162, 185", 	//点颜色
            stroke: "130,255,255", 		//线条颜色
            dist: 6000, 	//点吸附距离
            e_dist: 20000, 	//鼠标吸附加速距离
            max_conn: 10 	//点到点最大连接数
        }

        //调用
        CanvasParticle(config);
        this.setState({
            code:drawPic()
        })
    }

    componentWillUnmount(){
        document.removeEventListener("keyup",this.enter);
    }

    enter(e){
        if (e.keyCode == 13) {
            this.login();
        }
    }

    render() {
        return (
            <div style={{display:"flex",height:'100%',width:'100%',flexDirection:'column',
                background:"RGB(35,159,133)",backgroundSize:'100%'}}>
                <div id="mydiv" style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:98}}></div>

                <div style={{flex:1,display:'flex',justifyContent:'center',zIndex:99}}>
                    <div style={{width:380,height:370,marginTop:130,background:"RGBA(35,159,133,0.5)",boxShadow:"0px 0px 20px #ffffff",display:'flex',flexDirection:"column"}}>
                        <div style={{height:100,display:'flex',alignItems:"center",justifyContent:'center'}}>
                            <p1 style={{fontSize:22,color:'RGB(75,188,166)'}}>平台后台管理系统</p1>
                        </div>
                        <div style={{flex:1,display:'flex',alignItems:"center",flexDirection:'column'}}>
                            <div style={{width:300,height:45,backgroundColor:"RGB(96,189,170)",display:'flex',
                                alignItems:'center',borderRadius:5}}>
                                <img src='./images/member.png'
                                     style={{width:20,height:20,marginLeft:10}}/>
                                <input style={{height: 45,flex:1,paddingLeft:10,
                                    borderWidth:0,outline:"none",color:'#ffffff',backgroundColor:"RGB(96,189,170)"}}
                                       placeholder="账号"
                                       onChange={(e)=>{
                                           this.setState({
                                               system_account:e.target.value,
                                           })
                                       }}/>
                            </div>
                            <div style={{width:300,height:45,backgroundColor:"RGB(96,189,170)",display:'flex',
                                alignItems:'center',marginTop:5,borderRadius:5}}>
                                <img src='./images/password.png'
                                     style={{width:20,height:20,marginLeft:10}}/>
                                <input type="password" style={{height: 45,flex:1,paddingLeft:10,
                                    borderWidth:0,backgroundColor:"RGB(96,189,170)",outline:"none",}}
                                       placeholder="密码"
                                       onChange={(e)=>{
                                           this.setState({
                                               system_password:e.target.value,
                                           })
                                       }}/>
                            </div>
                            <div style={{width:300,height:45,backgroundColor:"RGB(96,189,170)",display:'flex',
                                alignItems:'center',marginTop:5,borderRadius:5}}>
                                <img src='./images/password.png'
                                     style={{width:20,height:20,marginLeft:10}}/>
                                <input style={{height: 45,flex:1,paddingLeft:10,
                                    borderWidth:0,backgroundColor:"RGB(96,189,170)",outline:"none",}}
                                       placeholder="验证码"
                                       onChange={(e)=>{
                                           this.setState({
                                               system_code:e.target.value,
                                           })
                                       }}/>
                                <canvas id="code" width="120" height="45" onClick={()=>{
                                    this.setState({
                                        code:drawPic()
                                    })
                                }}></canvas>
                            </div>
                            <div style={{backgroundColor:'RGB(22,142,116)',width:300,marginTop:5,borderRadius:10,height:40
                                ,display:'flex',alignItems:"center",justifyContent:'center'}}
                                 onClick={()=>{
                                     this.login();
                                 }}>
                                <p1 style={{fontSize:15,color:'#ffffff'}}>立即登录</p1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    login(){

        if(this.isNull(this.state.system_password)){
            this.showTip("密码不可为空");
            return;
        }
        if(this.isNull(this.state.system_account)){
            this.showTip("账号不可为空");
            return;
        }
        if(this.isNull(this.state.system_code)){
            this.showTip("请先填写验证码");
            return;
        }

        if(this.state.system_code.toLocaleLowerCase()!==this.state.code.toLocaleLowerCase()){
            this.showTip("验证码错误");
            // this.setState({
            //     code:drawPic()
            // })
            return;
        }
        var myDate = new Date();
        var curtime=this.toFixed(myDate.getTime()/1000,0);
        this.setStorage("time",curtime);
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/systemLogin",
            {system_account:this.state.system_account,
                system_password:this.state.system_password})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setStorage("systemAccountBean",JSON.stringify(data));
                this.props.history.push('/main');
                break;
        }
    }
}

module.exports=LoginComponent;