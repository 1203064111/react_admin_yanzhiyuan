/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class SystmLog extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemLogBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getSystemLogs();
    }
    getSystemLogs(){
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getSystemLogs"
            ,{page:this.state.page,start_time:this.state.start_time
                ,end_time:this.state.end_time})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    systemLogBeans:data,
                    total:total
                });
                break;
            case 2:
                this.getSystemLogs();
                break;

        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"系统日志列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Date
                        title="开始时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.start_time}
                        onChange={(value)=>{
                            this.state.start_time=value;
                            this.refresh();
                        }}/>
                    <Widget.Date
                        title="结束时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.end_time}
                        onChange={(value)=>{
                            this.state.end_time=value;
                            this.refresh();
                        }}/>

                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getSystemLogs();
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"日志ID",flex:1,key:'log_id'},
                        {name:"账号",flex:1,key:'account_name'},
                        {name:"操作id",flex:1,key:'module_id'},
                        {name:"操作",flex:1,key:'operate_type_show'},
                        {name:"详细",flex:1,key:'operate_desc'},
                        {name:"操作时间",flex:1,key:'create_time',type:'inputDate'}
                       ]}
                    dataSource={this.state.systemLogBeans}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getSystemLogs()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=SystmLog;

