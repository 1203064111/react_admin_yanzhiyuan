/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class GoodsIssue extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goodsIssueBean:[],
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),





        };
    }
    componentDidMount() {
        this.getGoodsIssues();
    }
    getMerchantsNoPage(){
        this.getDataByPost(7,shop_homeurl+"/merchantsController/v1.0/getMerchantss",{merchants_id:this.state.systemAccountBean.merchants_id})
    }
    getGoodsIssues(){

        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsIssues"
            ,{page:this.state.page,merchants_id:this.state.systemAccountBean.merchants_id
        })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsIssueBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodsIssues();
                break;
            case 3:
                this.getGoodsIssues();
                break;
        }
    }

    deleteGoodsIssue(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoodsIssue"
            ,{goods_issue_id:this.state.goods_issue_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"商品问题列表"} history={this.props.history}></Widget.Toolbar>
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

                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getGoodsIssues();
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"问题ID",flex:1,key:'goods_issue_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"问题描述",flex:1,key:'issue_desc'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.goodsIssueBean}
                    operationData={[{title:"详情"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_issue_answer/"+this.state.goodsIssueBean[rowID].goods_issue_id);
                                break;
                            case 1:

                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        goods_issue_id:this.state.goodsIssueBean[rowID].goods_issue_id
                                    },()=>{
                                        this.deleteGoodsIssue();
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
                            this.getGoodsIssues()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=GoodsIssue;

