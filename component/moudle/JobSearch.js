/**
 * Created by Administrator on 2018/7/16.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class JobSearch extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            jobSearchBeans:[],
            page:1,
            total:0,

            jobsearch_country:"",
            jobsearch_type:"",
            cityBeans:[{name:"全部"}],
            typeBeans:[],
        };
    }
    componentDidMount() {
        this.getJobSearchs();
        this.getOneCitys();
        this.getTypes();
    }
    getJobSearchs(){
        if(this.state.jobsearch_country === "全部"){
            this.state.jobsearch_country = "";
        }
        if(this.state.jobsearch_type === "全部"){
            this.state.jobsearch_type = "";
        }
        this.getDataByPost(1,moudle_homeurl+"/jobSearchController/v1.0/getJobSearchs"
            ,{page:this.state.page,jobsearch_country:this.state.jobsearch_country,
                jobsearch_type:this.state.jobsearch_type})
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
                    jobSearchBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getJobSearchs();
                this.getJobSearchType();
                break;
            case 3:
                this.showTip("审核完成");
                this.getJobSearchs();
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

    passJobSearch(){
        this.getDataByPost(3,moudle_homeurl+"/jobSearchController/v1.0/passJobSearch"
            ,{jobsearch_id:this.state.jobsearch_id})
    }

    deleteJobSearch(){
        this.getDataByPost(2,moudle_homeurl+"/jobSearchController/v1.0/deleteJobSearch"
            ,{jobsearch_id:this.state.jobsearch_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"找工作列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="服务区域"
                        show_value="name"
                        select_value="name"
                        dataSource={this.state.cityBeans}
                        onChange={(index)=>{
                            this.setState({
                                jobsearch_country:this.state.cityBeans[index].name
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
                                jobsearch_type:this.state.typeBeans[index].type_name
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getJobSearchs()
                            })
                        }}/>

                </Widget.View>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'jobsearch_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"标题",flex:1,key:'jobsearch_title'},
                        {name:"联系人",flex:1,key:'jobsearch_name'},
                        {name:"联系电话",flex:1,key:'jobsearch_mobile'},
                        {name:"头像",flex:1,key:'jobsearch_img',type:'img'},
                        {name:"服务类型",flex:1,key:'jobsearch_type'},
                        {name:"服务描述",flex:1,key:'jobsearch_desc'},
                        {name:"服务区域",flex:1,key:'jobsearch_country'},
                        {name:"申请状态",flex:1,key:'submit_state_show'},
                        {name:"拒绝原因",flex:1,key:'refuse_cause'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:3,key:"-1"}]}
                    dataSource={this.state.jobSearchBeans}
                    operationData={[{title:"申请通过"},{title:"申请拒绝"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认通过?",()=>{
                                    this.setState({
                                        jobsearch_id:this.state.jobSearchBeans[rowID].jobsearch_id
                                    },()=>{
                                        this.passJobSearch();
                                    })
                                })
                                break;
                            case 1:
                                if(this.state.jobSearchBeans[rowID].submit_state !== "1"){
                                    this.showTip("不是待审核申请");
                                    return;
                                }
                                this.props.history.push("/jobsearch_editor/"+this.state.jobSearchBeans[rowID].jobsearch_id);
                                break;
                            case 2:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        jobsearch_id:this.state.jobSearchBeans[rowID].jobsearch_id
                                    },()=>{
                                        this.deleteJobSearch();
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
                            this.getJobSearchs()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=JobSearch;

