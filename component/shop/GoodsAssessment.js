/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class GoodsAssessment extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goodsAssessmentBean:[],
            total:0,

            page:this.getNull(this.getSessionStorage(type+"page"),1),





        };
    }
    componentDidMount() {
        this.getGoodsAssessments();
    }
    getMerchantsNoPage(){
        this.getDataByPost(7,shop_homeurl+"/merchantsController/v1.0/getMerchantss",{merchants_id:this.state.systemAccountBean.merchants_id})
    }
    getGoodsAssessments(){

        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsAssessments"
            ,{page:this.state.page,merchants_id:this.state.systemAccountBean.merchants_id
        })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsAssessmentBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodsAssessments();
                break;
            case 3:
                this.showTip("回复成功");
                this.getGoodsAssessments();
                break;
            case 4:
                this.getGoodsAssessments();
                break;
        }
    }

    deleteGoodsAssessment(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoodsAssessment"
            ,{assessment_id:this.state.assessment_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"商品评论列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="商品名称"
                        value={this.state.goods_name}
                        onChange={(value)=>{
                            this.setState({
                                goods_name:value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="分类名称"
                        value={this.state.class_name}
                        onChange={(value)=>{
                            this.setState({
                                class_name:value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="供应商名称"
                        value={this.state.merchants_name}
                        onChange={(value)=>{
                            this.setState({
                                merchants_name:value
                            })
                        }}/>

                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getGoodsAssessments();
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"评论ID",flex:1,key:'assessment_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"评论描述",flex:1,key:'assessment_desc'},
                        {name:"评论等级",flex:1,key:'assessment_star'},
                        {name:"评论图片",flex:1,key:'assessment_imgs',type:'imgs'},
                        {name:"评论状态",flex:1,key:'apply_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.goodsAssessmentBean}
                    operationDatas={(index)=>{
                        return this.state.systemAccountBean.merchants_id!==""?[{title:"详情"},{title:"回复"}]:
                            this.state.systemAccountBean.merchants_id===""?[{title:"详情"}]:[];
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_assessment/"+this.state.goodsAssessmentBean[rowID].assessment_id);
                                break;

                            case 1:
                                this.openPrompt("填写回复","",(value)=>{
                                    this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/insertGoodsAssessment",
                                        {parent_id:this.state.goodsAssessmentBean[rowID].assessment_id,
                                            goods_id:this.state.goodsAssessmentBean[rowID].goods_id,
                                            member_id:this.state.systemAccountBean.merchants_id,
                                            assessment_desc:value})
                                },3)
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="apply_state"){
                            this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/updateGoodsAssessment",
                                {assessment_id:this.state.goodsAssessmentBean[rowID].assessment_id,
                                    apply_state:value});
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGoodsAssessments()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=GoodsAssessment;

