/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Information extends Widget.Base{//掌牧资讯
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
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getInformations"
            ,{page:this.state.page,information_state:this.state.information_state},{type:2})
    }

    deleteInformation(){
        this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/deleteInformation",{information_id:this.state.information_id})
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
            
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"资讯列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/i_information_editor/-1");
                        }}/>
                </Widget.View>
                
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'information_id'},
                        {name:"标题",flex:2,key:'information_title'},
                        {name:"简介",flex:1,key:'information_desc'},
                        {name:'图片',flex:1,key:'information_img',type:'img'},
                        {name:'作者',flex:1,key:'information_author'},
                        {name:'信息来源',flex:1,key:'information_resource'},
                        {name:"状态",flex:1,key:'information_state',type:'radio_select'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.InformationBeans }
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/i_information_editor/"+this.state.InformationBeans[rowID].information_id);
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
module.exports=Information;