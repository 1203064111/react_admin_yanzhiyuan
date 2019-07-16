/**
 * Created by sjb on 18/5/5.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class ClueIndustry extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            ClueIndustryBeans:[],
            page:1,
            total:0
        };
    }

    componentDidMount() {
        this.getClueIndustrys();
    }
    getClueIndustrys(){
        this.getDataByPost(1,clue_homeurl+"/clueController/v1.0/getClueIndustrys",{page:this.state.page},{type:2})
    }

    deleteClueIndustry(){
        this.getDataByPost(2,clue_homeurl+"/clueController/v1.0/deleteClueIndustry",{industry_id:this.state.industry_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ClueIndustryBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getClueIndustrys();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteClueIndustry();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"线索行业"} history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',marginTop:20}}>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/clue_industry_editor/-1");
                        }}/>
                </div>
                <Widget.List
                    data={[
                        {name:"行业ID",flex:1,key:'industry_id'},
                        {name:"行业名称",flex:1,key:'industry_name'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.ClueIndustryBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/clue_industry_editor/"+this.state.ClueIndustryBeans[rowID].industry_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    industry_id:this.state.ClueIndustryBeans[rowID].industry_id
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
                            this.getClueIndustrys()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=ClueIndustry;