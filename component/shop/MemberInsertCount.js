/**
 * Created by hwq on 2018/8/17.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberInsertCount extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberCountBean:{},
        };
    }
    componentDidMount() {
        this.getMemberInsertCounts();
    }

    getMemberInsertCounts(){
        if(this.state.member_min_time > this.state.member_max_time){
            this.showTip("时间错误");
            return;
        }

        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/getMemberInsertCounts",
            {member_min_time:this.state.member_min_time,
                member_max_time:this.state.member_max_time})
    }

    doSuccess(index,data,total){
        switch (index){

            case 2:
                this.setState({
                    memberCountBean:data,
                });
                break;


        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户统计"} ></Widget.Toolbar>
                <Widget.View>
                    <Widget.Date
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        type="datetime"
                        placeholder="最小时间"
                        value={this.state.member_min_time}
                        onChange={(value)=>{
                            this.setState({
                                member_min_time:value
                            })
                        }}/>
                    <Widget.Date
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        type="datetime"
                        placeholder="最大时间"
                        value={this.state.member_max_time}
                        onChange={(value)=>{
                            this.setState({
                                member_max_time:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getMemberInsertCounts();
                        }}/>

                </Widget.View>
                <Widget.Detail
                    title="新增会员统计"
                    baseData={[{name:"新增会员",flex:1,key:'member_count',type:'text'},
                    ]}
                    data={this.state.memberCountBean}



                />

            </div>

        )
    }
}

module.exports=MemberInsertCount;

