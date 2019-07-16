/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityLimit extends Widget.Base{
    constructor(props) {
        super(props);
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"))
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.isNull(systemAccountBean.merchants_id)?"":systemAccountBean.merchants_id,
            activityBeans:[],
            page:1,
            total:0,
            activity_type:"4",
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
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"优惠"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_activity_limit_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'activity_id'},
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
                                this.props.history.push("/goods_activity_limit_editor/"+this.state.activityBeans[rowID].activity_id);
                                break;
                            case 1:
                                this.openTip("确定删除?",()=>{
                                    this.setState({
                                        activity_id:this.state.activityBeans[rowID].activity_id
                                    },()=>{
                                        this.deleteActivity();
                                    })
                                })
                                break;
                            case 2:
                                this.props.history.push("/goods_activity_limit_goods/"+this.state.activityBeans[rowID].activity_id);
                                break;
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

module.exports=ActivityLimit;