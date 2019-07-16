/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Certification extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            certificationBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getCertificationBeans();
    }
    getCertificationBeans(){
        this.getDataByPost(1,moudle_homeurl+"/moudleController/v1.0/getCertificationBeans"
            ,{page:this.state.page,member_mobile:this.state.member_mobile})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    certificationBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getCertificationBeans();
                break;
            case 3:
                this.showTip("审核完成");
                this.getCertificationBeans();
                break;
        }
    }

    passCertificationBean(){
        this.getDataByPost(3,moudle_homeurl+"/moudleController/v1.0/passCertificationBean"
            ,{member_id:this.state.member_id})
    }

    deleteCertificationBean(){
        this.getDataByPost(2,moudle_homeurl+"/moudleController/v1.0/deleteCertificationBean"
            ,{certification_id:this.state.certification_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"资质申请列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="邀请人电话"
                        value={this.state.member_mobile}
                        onChange={(value)=>{
                            this.setState({
                                member_mobile:value
                            })
                        }}/>

                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getCertificationBeans()
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"资质申请ID",flex:1,key:'certification_id'},
                        {name:"申请用户ID",flex:1,key:'member_id'},
                        {name:"邀请人姓名",flex:1,key:'member_name'},
                        {name:"邀请人电话",flex:1,key:'member_mobile'},
                        {name:"企业认证资料",flex:1,key:'enterprise_img1',type:'img'},
                        {name:"提交状态",flex:1,key:'submit_state_show'},
                        {name:"拒绝原因",flex:1,key:'refuse_cause'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:3,key:"-1"}]}
                    dataSource={this.state.certificationBeans}
                    operationData={[{title:"申请通过"},{title:"申请拒绝"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认通过?",()=>{
                                    this.setState({
                                        member_id:this.state.certificationBeans[rowID].member_id
                                    },()=>{
                                        this.passCertificationBean();
                                    })
                                })
                                break;
                            case 1:
                                if(this.state.certificationBeans[rowID].submit_state !== "1"){
                                    this.showTip("不是待审核申请");
                                    return;
                                }
                                this.props.history.push("/certification_editor/"+this.state.certificationBeans[rowID].member_id);
                                break;
                            case 2:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        certification_id:this.state.certificationBeans[rowID].certification_id
                                    },()=>{
                                        this.deleteCertificationBean();
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
                            this.getCertificationBeans()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=Certification;

