
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../widget/widget');


class MainComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean"));
        this.state = {
            moudleBeans:[],
            itemCurIndex:welcome_type==="2"?-1:0,
            menuCurIndex:welcome_type==="2"?-1:0,
            systemAccountBean:systemAccountBean,
            visible:false,
            display_show:'flex',
            img_src:'./images/you1.png'
        };
    }

    componentDidMount() {
        this.setStorage("titleInfo","[]");
        if(welcome_type==="2"){
            // this.props.history.push("welcome");
        }
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getRoleMoudles",{});
    }

    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    moudleBeans:data,
                });
                if(welcome_type!=="2") {
                    this.setStorage("titleInfo", "[]");
                    this.props.history.push(data[0].menuBeans[0].moudle_url);
                }
                break;
        }
    }

    render(){
        return(
            <div style={{display:'flex',height:'100%',width:'100%',flex:1,flexDirection:'column',overflow:'auto'}}>
                <div style={{background:'#1ABC9C',height:35,display:'flex',alignItems:'center'}}
                     onMouseLeave={()=>{
                         this.setState({
                             visible:false,
                         })
                     }}>
                    <p1 style={{marginLeft:20,color:'#ffffff'}}>管理后台</p1>
                    <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',flex:1}}
                         >
                        <div style={{height:40,}}>
                            <div style={{marginRight:20,height:40,display:'flex',alignItems:'center'}}>
                                <p1 style={{color:'#ffffff'}}onMouseOver={()=>{
                                    this.setState({
                                        visible:true,
                                    })
                                }}
                                    >{this.state.systemAccountBean.system_name}</p1>
                                <img src={'./images/shang.png'}
                                     style={{width:12,height:8,marginLeft:10}}/>
                            </div>
                            <div style={{display:this.state.visible?'flex':"none",flexDirection:'column'
                                ,position:'relative',left:0,right:0,top:-3,
                                borderWidth:1,borderColor:'#efefef',borderStyle:'solid'}}>
                                <div style={{background:'#ffffff',display:'flex',width:75,height:30,
                                            alignItems:"center",justifyContent:'center'}}
                                     onClick={()=>{
                                         this.props.history.push("/system_account_editor/"+encodeURIComponent(JSON.stringify(this.state.systemAccountBean))+"/common");
                                     }}>
                                    <p1 style={{fontSize:13}}>个人信息</p1>
                                </div>
                                <div style={{background:'#efefef',height:1}}></div>
                                <div style={{background:'#ffffff',display:'flex',width:75,height:30,
                                    alignItems:"center",justifyContent:'center'}}
                                    onClick={()=>{
                                        this.props.history.push("/system_account_password/"+this.state.systemAccountBean.account_id);
                                    }}>
                                    <p1 style={{fontSize:13}}>修改密码</p1>
                                </div>
                                <div style={{background:'#efefef',height:1}}></div>
                                <div style={{background:'#ffffff',display:'flex',width:75,height:30,
                                                alignItems:"center",justifyContent:'center'}}
                                                onClick={()=>{
                                                    this.setStorage("systemAccountBean",JSON.stringify({}));
                                                    window.location.href= htmlurl+"index.html";
                                                }}>
                                    <p1 style={{fontSize:13}}>退出登录</p1>
                                </div>
                                <div style={{background:'#efefef',height:1}}></div>
                            </div>
                        </div>
                        <img src={imgurl+this.state.systemAccountBean.system_img}
                             style={{marginRight:20,width:30,height:30,borderRadius:30}}></img>
                    </div>
                </div>
                <div style={{display:'flex',flex:1}}>
                    <Widget.Foreach
                            style={{width:160,background:'#c8c8c8',display:this.state.display_show,flexDirection:'column',overflow:'auto'}}
                            dataSource={this.state.moudleBeans}
                            renderRow={(rowID)=>{
                            return(
                                <div>
                                    <div style={{background:'#cdcdcd',height:1,flex:1}}></div>
                                    <div style={{height:33,width:160,background:'#c8c8c8',display:'flex',alignItems:'center',cursor: "pointer"}}
                                        onClick={()=>{
                                            this.setStorage("itemCurIndex",rowID);
                                            this.setStorage("menuCurIndex",0);
                                            this.setStorage("titleInfo","[]");
                                            this.setState({
                                                itemCurIndex:rowID,
                                                menuCurIndex:0,
                                            });
                                            this.props.history.push(this.state.moudleBeans[rowID].menuBeans[0].moudle_url);
                                        }}>

                                        <i style={{marginLeft:20}} className={this.state.moudleBeans[rowID].moudle_remark} title={this.state.moudleBeans[rowID].moudle_name}></i>

                                        <p1 style={{fontSize:13,marginLeft:10}}>{this.state.moudleBeans[rowID].moudle_name}</p1>
                                        <div style={{display:'flex',flex:1,justifyContent:'flex-end'}}>
                                            <img src={this.state.itemCurIndex===rowID?"./images/xia.png":'./images/shang.png'}
                                            style={{width:12,height:8,marginRight:20}}/>
                                        </div>
                                    </div>
                                    <div style={{background:'#cdcdcd',height:1,flex:1}}></div>
                                    <Widget.Foreach
                                        style={{display:this.state.itemCurIndex===rowID?'flex':"none",
                                                flexDirection:'column',cursor: "pointer"}}
                                        dataSource={this.state.moudleBeans[rowID].menuBeans}
                                        renderRow={(index)=>{
                                            return(
                                                    <div style={{height:33,width:160,alignItems:'center',display:'flex',cursor: "pointer",
                                                            background:this.state.menuCurIndex===index?"#ffffff":"#e6e6e6",color:this.state.menuCurIndex==index?"#1ABC9C":"#0b0b0b"}}
                                                             onClick={()=>{
                                                                 this.setStorage("menuCurIndex",rowID);
                                                                 this.setStorage("titleInfo","[]");
                                                                 this.setState({
                                                                     menuCurIndex:index
                                                                 });
                                                                 this.props.history.push(this.state.moudleBeans[rowID].menuBeans[index].moudle_url);
                                                             }}>
                                                            <p1 style={{fontSize:13,marginLeft:30}}>{this.state.moudleBeans[rowID].menuBeans[index].moudle_name}</p1>
                                                    </div>
                                            )
                                        }}>
                                    </Widget.Foreach>
                                </div>
                            )
                        }}/>
                    <div style={{display:'flex',width:20,flexDirection:'column',overflow:'auto'}}>
                        <div style={{background:'RGB(245,250,254)',width:30,height:35}}>
                        </div>
                        <div style={{display:'flex',flex:1,alignItems:'center'
                            ,justifyContent:'center',flexDirection:"column"}}>
                                <img src={this.state.img_src} style={{width:20,height:80}}
                                    onClick={()=>{
                                        if(this.state.display_show==='flex'){
                                            this.setState({
                                                display_show:"none",
                                                img_src:"./images/zuo1.png"
                                            })
                                        }else{
                                            this.setState({
                                                display_show:"flex",
                                                img_src:"./images/you1.png"
                                            })
                                        }

                                    }}
                                     onMouseOver={()=>{
                                         if(this.state.display_show==='flex'){
                                             this.setState({
                                                 img_src:"./images/zuo2.png"
                                             })
                                         }else{
                                             this.setState({
                                                 img_src:"./images/you2.png"
                                             })
                                         }
                                     }}
                                     onMouseLeave={()=>{
                                         if(this.state.display_show==='flex'){
                                             this.setState({
                                                 img_src:"./images/zuo1.png"
                                             })
                                         }else{
                                             this.setState({
                                                 img_src:"./images/you1.png"
                                             })
                                         }
                                     }}/>
                        </div>
                    </div>
                    <div style={{flex:1,background:'#ffffff',overflow:'auto'}}>
                        {this.props.children}
                    </div>

                </div>
                {/*<div style={{display:"flex",height:60,background:'RGB(76,76,76)'}}>*/}
                {/*</div>*/}
            </div>
        );
    }
}


module.exports=MainComponent;