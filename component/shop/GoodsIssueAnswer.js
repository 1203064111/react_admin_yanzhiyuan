/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class GoodsIssueAnswer extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goodsIssueAnswerBean:[],
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            goods_issue_id:this.props.params.goods_issue_id,

            answer_desc:this.getNull(this.getSessionStorage(type+"answer_desc"),""),



        };
    }
    componentDidMount() {
        this.getGoodsIssueAnswers();
    }
    getGoodsIssueAnswers(){
        this.setSessionStorage(type+"answer_desc",this.state.answer_desc);

        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getGoodsIssueAnswers"
            ,{page:this.state.page,goods_issue_id:this.state.goods_issue_id,
            answer_desc:this.state.answer_desc
            })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    goodsIssueAnswerBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getGoodsIssueAnswers();
                break;
            case 3:
                this.getGoodsIssueAnswers();
                break;
        }
    }

    deleteGoodsIssueAnswer(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteGoodsIssueAnswer"
            ,{issue_answer_id:this.state.issue_answer_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"问题回答列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="回答描述"
                        value={this.state.answer_desc}
                        onChange={(value)=>{
                            this.setState({
                                answer_desc:value
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
                                this.getGoodsIssueAnswers();
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"回答ID",flex:1,key:'issue_answer_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"问题回答",flex:1,key:'answer_desc'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.goodsIssueAnswerBean}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){

                            case 0:

                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        issue_answer_id:this.state.goodsIssueAnswerBean[rowID].issue_answer_id
                                    },()=>{
                                        this.deleteGoodsIssueAnswer();
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
                            this.getGoodsIssueAnswers()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=GoodsIssueAnswer;

