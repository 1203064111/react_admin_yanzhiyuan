/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class TaskClass extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            taskClassBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getTaskClasss();
    }
    getTaskClasss(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getTaskClasses"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    taskClassBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getTaskClasss();
                break;

        }
    }

    deleteTaskClass(){
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/deleteTaskClass"
            ,{class_id:this.state.class_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"任务列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/task_class_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'class_id'},
                        {name:"任务名称",flex:1,key:'class_name'},
                        {name:"任务图标",flex:1,key:'class_img',type:'img'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.taskClassBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/task_class_editor/"+this.state.taskClassBeans[rowID].class_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                    class_id:this.state.taskClassBeans[rowID].class_id
                                    },()=>{
                                        this.deleteTaskClass();
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
                            this.getTaskClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=TaskClass;

