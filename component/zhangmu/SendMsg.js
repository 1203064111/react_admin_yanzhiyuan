/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SendMsg extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            msgBean:{},
            sendType:'1',
            sendTypeBeans:[{name:'全体用户',value:'1'},{name:'个体用户',value:'2'}],
            sendMemberBean:[],
            memberBeans:[],
            page:1,
            total:0,
            member_arr:[],

        };
    }

    componentDidMount() {

        this.getMembers();
    }
    getMembers(){
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/getMembers"
            ,{page:this.state.page,member_account:this.state.member_account})
    }


   sendMsg(){//给全体用户发送
    var params={};
    params["msg_title"]=this.state.msgBean.msg_title;
    params["msg_desc"]=this.state.msgBean.msg_desc;
    params["msg_type"]="system";
    params["msg_class"]="1";
   

    this.getDataByPost(1,member_homeurl+"/settingController/v1.0/insertMemberMsgs"
    ,params)

   }
   sendMemberMsg(){//给选中的用户发送信息
    var params={};
    params["msg_title"]=this.state.msgBean.msg_title;
    params["msg_desc"]=this.state.msgBean.msg_desc;
    params["msg_type"]="system";
    params["msg_class"]="1";

    if(this.state.member_arr.length<=0){

        this.showTip("请先选择要发送的人")
        return;
    }
    var member_ids="";
    for(var i=0;i<this.state.member_arr.length;i++){
      member_ids=member_ids+this.state.member_arr[i]+",";
      
    }

    params["member_ids"]=member_ids;
    this.getDataByPost(1,member_homeurl+"/settingController/v1.0/insertMemberMsgs"
    ,params)
   }
    doSuccess(index,data,total){
        switch (index){
           
            case 1:
                this.showTip("发送成功");
                this.setState({
                    goods_arr:[]
                })
                break;
            case 2:
                this.setState({
                    memberBeans:data,
                    total:total
                })
                break;
           
        }
    }

    render(){
        let baseData=[]
        baseData=[
            {name:'消息标题',flex:1,key:'msg_title'},
            {name:'通知内容',flex:1,key:'msg_desc',type:'textarea'},
        ]
         return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"消息群发"} history={this.props.history}></Widget.Toolbar>
                {this.renderMembers()}
                <Widget.View>
                <div style={{display:'flex',alignItems:'center',}}>
                 <Widget.Select
                    dataSource={this.state.sendTypeBeans}
                    selectWidth={80}
                    selectHeight={30}
                    select_value="value"
                    show_value="name"
                    is_must="false"
                    onChange={
                        (index)=>{
                            this.setState({
                                sendType:this.state.sendTypeBeans[index].value
                            })
                        }
                    }
                />
                </div>
                 </Widget.View>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.msgBean}
                    onChange={(key,value,index)=>{
                        this.state.msgBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:"flex",alignItems:'center',justifyContent:'flex-end',flex:2}} >
                               
                                 <Widget.Button
                                 style={{marginRight:20}}
                                  value={this.state.sendType+""==="1"?"发送":"选择用户"}
                                  onClick={()=>{
                                   if(this.state.sendType+""==="1"){
                                    this.sendMsg();
                                   }else{
                                    console.log(this.state.msgBean.msg_title);
                                       if(
                                       this.isNull(this.state.msgBean.msg_title)){
                                           this.showTip("消息标题不可为空");
                                           return;
                                       }
                                       if(
                                       this.isNull(this.state.msgBean.msg_desc)){
                                        this.showTip("消息内容不可为空");
                                        return;
                                    }
                                        this.openHtml("#members","请选择用户") }
                                  }}/>
                               
                                </div>
                            )

                        }
                    }
                   />
                  
                  
                   
             </div>
            
         )  
                
    }

    //获取所有用户
    renderMembers(){//
        return(
            <div id="members" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="用户账号"
                        value={this.state.member_account}
                        onChange={(value)=> {
                            this.setState({
                                member_account: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getMembers();
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="发送"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.sendMemberMsg();
                        }}/>
                    </Widget.View>
                 <Widget.List
                    data={[
                        {name:'ID',flex:1,key:'-2'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"账号",flex:1,key:'member_account'},
                        {name:"昵称",flex:1,key:'member_nick_name'},
                        {name:"性别",flex:1,key:'member_sex_show'},
                        {name:"注册时间",flex:1,key:'create_time'},]}
                       
                    dataSource={this.state.memberBeans}
                    page={this.state.page}
                    total={this.state.total}
                    checkArr={this.state.member_arr}
                    checkKey="member_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.member_arr.push(key);
                        }else{
                            this.removeArray(this.state.member_arr,key)
                        }
                        this.refresh();
                    }}


                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMembers()
                        })
                    }}
                    >
                    
                </Widget.List>

            </div>
        )


    }
}

module.exports=SendMsg;