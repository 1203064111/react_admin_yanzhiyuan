/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class GoodsAssessmentEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goodsAssessmentBean:[],
            total:0,
            parent_id:this.props.params.assessment_id,
            page:this.getNull(this.getSessionStorage(type+"page"),1),





        };
    }
    componentDidMount() {
        this.getGoodsAssessments();
    }
    getGoodsAssessments(){

        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsAssessmentsByParent"
            ,{page:this.state.page,parent_id:this.state.parent_id,
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
                <Widget.Toolbar title={"商家回复列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"评论ID",flex:1,key:'assessment_id'},
                        {name:"商家名",flex:1,key:'member_name'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"回复描述",flex:1,key:'assessment_desc'},
                        {name:"回复状态",flex:1,key:'apply_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time',type:'textDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.goodsAssessmentBean}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){

                            case 0:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        assessment_id:this.state.goodsAssessmentBean[rowID].assessment_id
                                    },()=>{
                                        this.deleteGoodsAssessment();
                                    })
                                })
                                break;

                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="apply_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateGoodsAssessment",
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

module.exports=GoodsAssessmentEditor;

