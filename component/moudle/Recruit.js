/**
 * Created by Administrator on 2018/7/16.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Recruit extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            recruitBeans:[],
            page:1,
            total:0,

            recruit_country:"",
            recruit_type:"",
            cityBeans:[{name:"全部"}],
            typeBeans:[],

        };
    }
    componentDidMount() {
        this.getRecruits();
        this.getOneCitys();
        this.getTypes();
    }
    getRecruits(){
        if(this.state.recruit_country === "全部"){
            this.state.recruit_country = "";
        }
        if(this.state.recruit_type === "全部"){
            this.state.recruit_type = "";
        }
        this.getDataByPost(1,moudle_homeurl+"/recruitController/v1.0/getRecruits"
            ,{page:this.state.page,recruit_country:this.state.recruit_country,
                recruit_type:this.state.recruit_type})
    }

    getOneCitys(){
        this.getDataByPost(5,member_homeurl+"/settingController/v1.0/getOneCitys",
            {parent_id:801});
    }

    getTypes(){
        this.getDataByPost(4,moudle_homeurl+"/typeController/v1.0/getTypes"
            ,{})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    recruitBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getRecruits();
                this.getRecruitType();
                break;
            case 3:
                this.showTip("审核完成");
                this.getRecruits();
                break;
            case 4:
                this.state.typeBeans=[{type_name:"全部"}],
                this.setState({
                    typeBeans:this.state.typeBeans.concat(data),
                })
                break;
            case 5:
                this.setState({
                    cityBeans:this.state.cityBeans.concat(data),
                })
                break;
        }
    }

    passRecruit(){
        this.getDataByPost(3,moudle_homeurl+"/recruitController/v1.0/passRecruit"
            ,{recruit_id:this.state.recruit_id})
    }

    deleteRecruit(){
        this.getDataByPost(2,moudle_homeurl+"/recruitController/v1.0/deleteRecruit"
            ,{recruit_id:this.state.recruit_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"招聘列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="工作地点"
                        show_value="name"
                        select_value="name"
                        dataSource={this.state.cityBeans}
                        onChange={(index)=>{
                            this.setState({
                                recruit_country:this.state.cityBeans[index].name
                            })
                        }}/>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="服务类型"
                        show_value="type_name"
                        select_value="type_name"
                        dataSource={this.state.typeBeans}
                        onChange={(index)=>{
                            this.setState({
                                recruit_type:this.state.typeBeans[index].type_name
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getRecruits()
                            })
                        }}/>

                </Widget.View>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'recruit_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"标题",flex:1,key:'recruit_title'},
                        {name:"联系电话",flex:1,key:'recruit_mobile'},
                        {name:"服务类型",flex:1,key:'recruit_type'},
                        {name:"薪资待遇",flex:1,key:'recruit_pay'},
                        {name:"岗位职责",flex:1,key:'position_statement'},
                        {name:"职位要求",flex:1,key:'recruit_requirements'},
                        {name:"工作地点",flex:1,key:'recruit_country'},
                        {name:"审核状态",flex:1,key:'submit_state_show'},
                        {name:"拒绝原因",flex:1,key:'refuse_cause'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:3,key:"-1"}]}
                    dataSource={this.state.recruitBeans}
                    operationData={[{title:"申请通过"},{title:"申请拒绝"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认通过?",()=>{
                                    this.setState({
                                        recruit_id:this.state.recruitBeans[rowID].recruit_id
                                    },()=>{
                                        this.passRecruit();
                                    })
                                })
                                break;
                            case 1:
                                if(this.state.recruitBeans[rowID].submit_state !== "1"){
                                    this.showTip("不是待审核申请");
                                    return;
                                }
                                this.props.history.push("/recruit_editor/"+this.state.recruitBeans[rowID].recruit_id);
                                break;
                            case 2:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        recruit_id:this.state.recruitBeans[rowID].recruit_id
                                    },()=>{
                                        this.deleteRecruit();
                                    })
                                })
                                break;
                        }
                    }}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getRecruits();
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=Recruit;

