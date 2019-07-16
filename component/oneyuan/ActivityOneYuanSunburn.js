/**
 * Created by liyong on 2018/7/26.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityOneYuanSunburn extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goods_id:this.props.params.goods_id,
            activity_id:this.props.params.activity_id,
            ZMActivitySunburnBean:[],
            page:1,
            total:0,
            sunburn_arr:[],
        };
    }
    componentDidMount() {
        this.getActivitySunburn();
    }
    getActivitySunburn(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivitySunburn"
            ,{page:this.state.page,
                goods_id:this.state.goods_id,
                activity_id:this.state.activity_id,
                },{type:2})
    }

    updateActivitySunburn(){
        this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/updateActivitySunburn",
            {sunburn_ids:this.state.sunburn_arr.toString()})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    ZMActivitySunburnBean:data.data,
                    total:data.total

                });
                break;

            case 2:
                this.showTip("选择成功");
                this.setState({
                    sunburn_arr:[]
                })
                this.getActivitySunburn();
                break;

        }
    }



    render(){

        return(
            <div>
                <Widget.Toolbar title={"评价列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateActivitySunburn()
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[
                        {name:"复选框",flex:1,key:"-2"},
                        {name:"ID",flex:1,key:'sunburn_id'},
                        {name:"订单ID",flex:1,key:'activity_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"评价内容",flex:1,key:'evaluate_text'},
                        {name:"评价时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.ZMActivitySunburnBean}
                    page={this.state.page}
                    total={this.state.total}
                    checkArr={this.state.sunburn_arr}
                    checkKey="sunburn_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.sunburn_arr.push(key);
                        }else{
                            this.removeArray(this.state.sunburn_arr,key)
                        }
                        this.refresh();
                    }}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getActivitySunburn()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=ActivityOneYuanSunburn;