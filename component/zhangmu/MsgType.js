/**
 * Created by sjb on 17/10/12.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class MsgTypeComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        this.state={
            typeBeans:[]
        }
    }
    componentDidMount() {
        this.getMsgTypes();
    }

    getMsgTypes(){
        this.getDataByPost(1,member_homeurl+"/settingController/v1.0/getMsgTypes",{});
    }

    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    typeBeans:data
                })
                break;
            case 2:
                this.showTip("保存成功");
                break;
        }
    }

    updateMsgType(type_id,msg_state,msg_desc){
        this.getDataByPost(2,member_homeurl+"/settingController/v1.0/updateMsgType",{type_id:type_id,msg_state:msg_state,msg_desc:msg_desc});
    }
    render(){

        var view=[];

        var total_flex=0;
        var viewTemp=[];
        for(let i=0;i<this.state.typeBeans.length;i++){
            let flex=1;

            if(total_flex+flex>3){
                if(3-total_flex>0){//保证一行一定是三等分
                    viewTemp.push(
                        <div style={{display:'flex',flex:3-total_flex}}>
                        </div>
                    )
                }
                view.push(
                    <div style={{display:'flex',flex:1,marginTop:20,alignItems:'center'}}>
                        {viewTemp}
                    </div>
                )
                total_flex=flex;
                viewTemp=[];
            }else{
                total_flex+=flex;
            }


            viewTemp.push(
                <div style={{display:'flex',flex:flex}}>

                    <div style={{width:340,height:270,borderStyle:'solid',
                        borderWidth:1,borderColor:'RGB(216,216,216)',borderRadius:5}}>
                        <div style={{height:60,display:'flex',alignItems:'center'}}>
                            <p1 style={{marginLeft:20,fontSize:20,fontWeight:'solid'}}>{this.state.typeBeans[i].msg_name}</p1>
                        </div>
                        <textarea
                            type={"text"}
                            placeholder={""}
                            style={{width:300,height:140,marginLeft:20,fontSize:15,borderRadius:5}}
                            value={this.state.typeBeans[i].msg_desc}
                            onChange={(e)=>{
                                this.state.typeBeans[i].msg_desc=e.target.value;
                                this.refresh();
                            }}/>
                        <div style={{height:70,display:'flex',alignItems:'center'}}>
                            <Widget.Button
                                background="RGB(38,159,214)"
                                marginLeft={20}
                                value="保存"
                                onClick={()=>{
                                    this.updateMsgType(this.state.typeBeans[i].type_id,this.state.typeBeans[i].msg_state,this.state.typeBeans[i].msg_desc);
                                }}/>
                            <Widget.Check
                                visible="true"
                                title="是否开启"
                                checked={this.state.typeBeans[i].msg_state}
                                onClick={(checked)=>{
                                    this.state.typeBeans[i].msg_state=checked;
                                    this.refresh();
                                }}/>
                        </div>
                    </div>
                </div>
            )
        }
        if(this.state.typeBeans.length>0){
            if(3-total_flex>0){//保证一行一定是三等分
                viewTemp.push(
                    <div style={{display:'flex',flex:3-total_flex}}>
                    </div>
                )
            }
            view.push(
                <div style={{display:'flex',flex:1,marginTop:20,marginBottom:20
                    ,alignItems:'center'}}>
                    {viewTemp}
                </div>
            )
        }
        return(
            <div style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                {view}
            </div>
        )
    }
}

module.exports=MsgTypeComponent;