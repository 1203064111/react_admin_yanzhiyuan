/**
 * Created by sjb on 18/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityReduceEditor extends Widget.Base{
    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            merchants_id:this.isNull(systemAccountBean.merchants_id)?"-1":systemAccountBean.merchants_id,
            activity_id:this.props.params.activity_id,
            activityBean:{activity_type:"2"},
            activityReduceBean:{give_type:"1"},
            typeBeans:[{name:"赠送商品",value:"1"}],
        };
    }

    componentDidMount() {
        if(this.props.params.activity_id!=="-1"){
            this.getActivityReduceDetail();
        }
    }

    getActivityReduceDetail(){
        this.getDataByPost(1,shop_homeurl+"/shopActivityController/v1.0/getActivityReduceDetail",{activity_id:this.state.activity_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    activityBean:data,
                    activityReduceBean:data.activityReduceBean,
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
        if(this.isNull(this.state.activityBean.activity_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["merchants_id"]=this.state.merchants_id;
        params["activity_name"]=this.state.activityBean.activity_name;
        params["activity_desc"]=this.state.activityBean.activity_desc;
        params["activity_type"]=this.state.activityBean.activity_type;
        params["activity_state"]=this.state.activityBean.activity_state;
        params["activity_img"]=this.state.activityBean.activity_img;
        params["start_time"]=this.state.activityBean.start_time;
        params["end_time"]=this.state.activityBean.end_time;

        params["reduce_id"]=this.state.activityReduceBean.reduce_id;
        params["reduce_price"]=this.state.activityReduceBean.reduce_price;
        params["reduce_full_price"]=this.state.activityReduceBean.reduce_full_price;

        if(this.state.activity_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/shopActivityController/v1.0/insertActivity",params);
        }else{
            params["activity_id"]=this.state.activity_id;
            this.getDataByPost(3,shop_homeurl+"/shopActivityController/v1.0/updateActivity",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"满减详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="活动信息"
                    baseData={[{name:"活动名称",flex:2,key:'activity_name'},
                        {name:"活动描述",flex:1,key:'activity_desc',type:'textarea'},
                        {name:"活动封面",flex:1,key:'activity_img',type:'img',img_style:{height:80,width:80,marginLeft:10}},
                        {name:"开始时间",flex:1,key:'start_time',type:"date",dateType:"datetime"},
                        {name:"结束时间",flex:1,key:'end_time',type:"date",dateType:"datetime"},
                        {name:"活动状态",flex:1,key:'activity_state',type:'radio_select'}
                    ]}
                    data={this.state.activityBean}
                    onChange={(key,value,index)=>{
                        this.state.activityBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertActivity();
                    }}/>
                <Widget.Detail
                    title="优惠信息"
                    baseData={[
                        {name:"满足金额",flex:1,key:'reduce_full_price'},
                        {name:"优惠金额",flex:1,key:"reduce_price"},
                    ]}
                    data={this.state.activityReduceBean}
                    onChange={(key,value,index)=>{
                        this.state.activityReduceBean[key]=value;
                        this.refresh();
                    }}/>
            </div>
        )
    }

}

module.exports=ActivityReduceEditor;