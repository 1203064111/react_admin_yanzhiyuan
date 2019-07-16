/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class RecordInformation extends Widget.Base{//掌牧资讯
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            InformationBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getInformations();
    }
    getInformations(){
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getSystemInformations"
            ,{page:this.state.page,information_state:this.state.information_state,class_id:4},{type:2})
    }

    deleteInformation(){
        this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/deleteSystemInformation",{information_id:this.state.information_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    InformationBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getInformations();
                break;
            case 3:
                this.getInformations();
                break;
            case 4:
                this.showTip("沉贴成功");
                this.getInformations();
                break;


        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"用户日志列表"} history={this.props.history}></Widget.Toolbar>


                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'information_id'},
                        {name:"标题",flex:2,key:'information_title'},
                        {name:"简介",flex:1,key:'information_desc'},
                        {name:'图片',flex:4,key:'information_img',type:'imgs'},
                        {name:"状态",flex:1,key:'information_state',type:'radio_select'},
                        {name:"创建时间",flex:2,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.InformationBeans }
                    operationDatas={(index)=>{
                        return this.state.InformationBeans[index].setting_bottom!=="0"?[{title:"编辑"},{title:"删除"}]:
                            this.state.InformationBeans[index].setting_bottom==="0"?[{title:"编辑"},{title:"删除"},{title:"沉贴"}]:[];
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/share_information_editor/"+this.state.InformationBeans[rowID].information_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        information_id:this.state.InformationBeans[rowID].information_id
                                    },()=>{
                                        this.deleteInformation();
                                    })
                                })
                                break;
                            case 2:
                                this.openTip("确认沉贴?",()=>{
                                    this.getDataByPost(4,information_homeUrl+"/informationController/v1.0/updateSystemInformation"
                                        ,{information_id:this.state.InformationBeans[rowID].information_id,
                                            create_time:this.state.InformationBeans[rowID].create_time});
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="information_state"){
                            this.getDataByPost(3,information_homeUrl+"/informationController/v1.0/updateSystemInformation"
                                ,{information_id:this.state.InformationBeans[rowID].information_id,
                                    information_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getInformations()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=RecordInformation;