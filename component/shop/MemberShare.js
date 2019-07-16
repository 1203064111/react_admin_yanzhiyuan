/**
 * Created by hwq on 2018/10/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class JobSearchEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            memberShareBean:[],



        };
    }

    componentDidMount() {
        this.getMemberShare();
    }

    getMemberShare(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getMemberShare")
    }




    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    memberShareBean:data,
                })
                break;
            case 3:
                this.showTip("修改成功");
                break;
        }
    }

    updateMemberShare(){

        var params={};
        params["member_share_id"]=this.state.memberShareBean.member_share_id;
        params["share_title"]=this.state.memberShareBean.share_title;
        params["share_price"]=this.state.memberShareBean.share_price;
        params["share_desc"]=this.state.memberShareBean.share_desc;

        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateMemberShare", params)
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"分享设置"} ></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="分享内容"
                    baseData={[
                        {name:"分享标题",flex:1,key:'share_title'},
                        {name:"分享佣金",flex:1,key:'share_price'},
                        {name:"分享内容",flex:1,key:'share_desc'},

                    ]}
                    data={this.state.memberShareBean}
                    onChange={(key,value)=>{

                        this.state.memberShareBean[key]=value;

                        this.refresh();
                    }}
                />
                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateMemberShare();
                        }}/>
                    </div>
            </div>
        )
    }



}



module.exports=JobSearchEditor;