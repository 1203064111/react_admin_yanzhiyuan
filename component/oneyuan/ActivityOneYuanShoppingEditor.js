/**
 * Created by liyong on 2018/7/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityOneYuanShoppingEditor extends Widget.Base{
    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            activity_id:this.props.params.activity_id,
            ZMActivityBean:{},
        };
    }

    componentDidMount() {
        if(this.props.params.activity_id!=="-1"){
            this.getActivityDetail();
        }
    }

    getActivityDetail(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivityDetail",{activity_id:this.state.activity_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ZMActivityBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertActivity(){
        if(this.isNull(this.state.ZMActivityBean.activity_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["activity_name"]=this.state.ZMActivityBean.activity_name;
        params["activity_desc"]=this.state.ZMActivityBean.activity_desc;
        params["activity_type"]=this.state.ZMActivityBean.activity_type;
        params["activity_state"]=this.state.ZMActivityBean.activity_state;
        params["activity_img"]=this.state.ZMActivityBean.activity_img;
        params["start_time"]=this.state.ZMActivityBean.start_time;
        params["end_time"]=this.state.ZMActivityBean.end_time;

        if(this.state.activity_id==="-1"){
            this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/insertActivity",params);
        }else{
            params["activity_id"]=this.state.activity_id;
            this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/updateActivity",params);
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"一元抢购详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="活动信息"
                    baseData={[
                        {name:"ID",flex:1,key:'activity_id'},
                        {name:"活动名称",flex:2,key:'activity_name'},
                        {name:"活动状态",flex:1,key:'activity_state',type:'radio_select'},
                        {name:"活动描述",flex:1,key:'activity_desc'},
                        {name:"活动封面",flex:1,key:'activity_img',type:'img'},
                        {name:"开始时间",flex:1,key:'start_time'},
                        {name:"结束时间",flex:1,key:'end_time'},
                        {name:"活动价格",flex:1,key:'activity_price'}
                    ]}
                    data={this.state.ZMActivityBean}
                    onChange={(key,value,index)=>{
                        this.state.ZMActivityBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertActivity();
                    }}/>
            </div>
        )
    }

}

module.exports=ActivityOneYuanShoppingEditor;
