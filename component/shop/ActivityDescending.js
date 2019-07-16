/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityDescending extends Widget.Base{
    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.isNull(systemAccountBean.merchants_id)?"":systemAccountBean.merchants_id,
            activityBeans:[],
            page:1,
            total:0,
            activity_type:"3",
        };
    }

    componentDidMount() {
        this.getActivitys();
    }
    getActivitys(){
        this.getDataByPost(1,shop_homeurl+"/shopActivityController/v1.0/getActivitys"
            ,{page:this.state.page,
                activity_type:this.state.activity_type,
                merchants_id:this.state.merchants_id},{type:2})
    }

    deleteActivity(){
        this.getDataByPost(2,shop_homeurl+"/shopActivityController/v1.0/deleteActivity",{activity_id:this.state.activity_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    activityBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getActivitys();
                break;
            case 3:
                this.getActivitys();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteActivity();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"直降优惠"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{display:this.state.systemAccountBean.system_type+""==="2"?"flex":"none"}}
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_activity_descending_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'activity_id'},
                        {name:"商家id",flex:2,key:'merchants_id'},
                        {name:"活动名称",flex:2,key:'activity_name'},
                        {name:"活动描述",flex:1,key:'activity_desc'},
                        {name:"活动封面",flex:1,key:'activity_img',type:'img'},
                        {name:"活动状态",flex:1,key:'activity_state',type:'radio_select'},
                        {name:"开始时间",flex:1,key:'start_time'},
                        {name:"结束时间",flex:1,key:'end_time'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.activityBeans}
                    operationData={[{title:"编辑"},{title:"删除"},{title:"商品列表"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_activity_descending_editor/"+this.state.activityBeans[rowID].activity_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    activity_id:this.state.activityBeans[rowID].activity_id
                                })
                                break;
                            case 2:
                                this.props.history.push("/goods_activity_goods/"+this.state.activityBeans[rowID].activity_id+"/"+this.state.activity_type+"/"+this.state.activityBeans[rowID].merchants_id);
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="activity_state"){
                            this.getDataByPost(3,shop_homeurl+"/shopActivityController/v1.0/updateActivityState"
                                ,{activity_id:this.state.activityBeans[rowID].activity_id
                                    ,activity_state:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getActivitys()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=ActivityDescending;