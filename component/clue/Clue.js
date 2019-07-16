/**
 * Created by sjb on 18/5/5.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class Clue extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            ClueBeans:[],
            page:1,
            total:0
        };
    }

    componentDidMount() {
        this.getClues();
    }
    getClues(){
        this.getDataByPost(1,clue_homeurl+"/clueController/v1.0/getClues",{page:this.state.page},{type:2})
    }

    deleteClue(){
        this.getDataByPost(2,clue_homeurl+"/clueController/v1.0/deleteClue",{clue_id:this.state.clue_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ClueBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getClues();
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
                                this.deleteClue();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"线索行业"} history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',marginTop:20}}>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/clue_editor/-1");
                        }}/>
                </div>
                <Widget.List
                    data={[
                        {name:"线索ID",flex:1,key:'clue_id'},
                        {name:"线索名称",flex:1,key:'clue_name'},
                        {name:"行业名称",flex:1,key:'industry_name'},
                        {name:"线索描述",flex:3,key:'clue_desc'},
                        {name:"线索积分",flex:1,key:'clue_price'},
                        {name:"总共卖几份",flex:1,key:'clue_num'},
                        {name:"已卖几份",flex:1,key:'clue_buy_num'},
                        {name:"线索联系电话",flex:1,key:'clue_mobile'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.ClueBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/clue_editor/"+this.state.ClueBeans[rowID].clue_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    clue_id:this.state.ClueBeans[rowID].clue_id
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
                            this.getClues()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Clue;