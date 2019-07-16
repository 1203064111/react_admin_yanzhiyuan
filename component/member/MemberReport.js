/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberReport extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberReportBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberReports();
    }
    getMemberReports(){
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getMemberReports"
            ,{page:this.state.page,report_desc:this.state.report_desc})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberReportBeans:data,
                    total:total
                });
                break;
            case 2:
                this.getMemberReports();
                break;

        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"资讯举报列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="举报内容"
                        value={this.state.report_desc}
                        onChange={(value)=>{
                            this.setState({
                                report_desc:value
                            })
                        }}/>

                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getMemberReports();
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'report_id'},
                        {name:"资讯id",flex:1,key:'information_id'},
                        {name:"举报人id",flex:1,key:'member_id'},
                        {name:"举报理由",flex:1,key:'report_desc'},
                        {name:"操作时间",flex:1,key:'create_time',type:'inputDate'}
                       ]}
                    dataSource={this.state.memberReportBeans}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberReports()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberReport;

