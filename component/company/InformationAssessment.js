/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


var type="goods";
class InformationAssessment extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            InformationAssessmentBean:[],
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            information_title:this.getNull(this.getSessionStorage(type+"information_title"),""),
            class_id:this.getNull(this.getSessionStorage(type+"class_id"),""),
            assessment_desc:this.getNull(this.getSessionStorage(type+"assessment_desc"),""),




        };
    }
    componentDidMount() {
        this.getInformationAssessments();
    }
    getInformationAssessments(){

        this.setSessionStorage(type+"information_title",this.state.information_title);
        this.setSessionStorage(type+"class_id",this.state.class_id);
        this.setSessionStorage(type+"assessment_desc",this.state.assessment_desc);
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getInformationAssessments"
            ,{page:this.state.page,
                information_title:this.state.information_title,class_id:this.state.class_id,
                assessment_desc:this.state.assessment_desc,
        })
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    InformationAssessmentBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getInformationAssessments();
                break;
            case 3:
                this.getInformationAssessments();
                break;
        }
    }

    deleteInformationAssessment(){
        this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/deleteInformationAssessment"
            ,{assessment_id:this.state.assessment_id,information_id:this.state.information_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"资讯评论列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="资讯标题"
                        value={this.state.information_title}
                        onChange={(value)=>{
                            this.setState({
                                information_title:value
                            })
                        }}/>
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
                                this.getInformationAssessments();
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"评论ID",flex:1,key:'assessment_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"资讯标题",flex:1,key:'information_title'},
                        {name:'评论图片',flex:3,key:'assessment_imgs',type:'imgs'},

                        {name:"评论描述",flex:1,key:'assessment_desc'},
                        {name:"创建时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.InformationAssessmentBean}
                    operationData={[{title:"详情"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/information_assessment_answer/"+this.state.InformationAssessmentBean[rowID].assessment_id);
                                break;
                            case 1:

                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        assessment_id:this.state.InformationAssessmentBean[rowID].assessment_id,
                                        information_id:this.state.InformationAssessmentBean[rowID].information_id
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
                            this.getInformationAssessments()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=InformationAssessment;

