/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class InformationAssessmentAnswer extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            InformationAssessmentAnswerBean:[],
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            parent_id:this.props.params.assessment_id,

            assessment_desc:this.getNull(this.getSessionStorage(type+"assessment_desc"),""),



        };
    }
    componentDidMount() {
        this.getInformationAssessmentAnswers();
    }
    getInformationAssessmentAnswers(){
        this.setSessionStorage(type+"assessment_desc",this.state.assessment_desc);

        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getInformationAssessmentAnswers"
            ,{page:this.state.page,goods_issue_id:this.state.goods_issue_id,
                assessment_desc:this.state.assessment_desc,
                parent_id:this.state.parent_id
            })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    InformationAssessmentAnswerBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getInformationAssessmentAnswers();
                break;
            case 3:
                this.getInformationAssessmentAnswers();
                break;
        }
    }

    deleteInformationAssessment(){
        this.getDataByPost(2,information_homeUrl+"/goodsController/v1.0/deleteInformationAssessment"
            ,{assessment_id:this.state.assessment_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"资讯评论回复列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="评论内容"
                        value={this.state.assessment_desc}
                        onChange={(value)=>{
                            this.setState({
                                assessment_desc: value
                            })
                        }}
                        />

                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getInformationAssessmentAnswers();
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"评论ID",flex:1,key:'assessment_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"资讯标题",flex:1,key:'information_title'},
                        {name:'评论图片',flex:1,key:'assessment_imgs',type:'img'},

                        {name:"评论描述",flex:1,key:'assessment_desc'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.InformationAssessmentAnswerBean}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){

                            case 0:

                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        assessment_id:this.state.InformationAssessmentAnswerBean[rowID].assessment_id
                                    },()=>{
                                        this.deleteInformationAssessment();
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
                            this.getInformationAssessmentAnswers()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=InformationAssessmentAnswer;

