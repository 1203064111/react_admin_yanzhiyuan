/**
 * Created by hwq on 2018/9/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberLevel extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberLevelBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberLevels();
    }
    getMemberLevels(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberLevels"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberLevelBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMemberLevels();
                break;
            case 3:
                this.getMemberLevels();
                break;

        }
    }

    deleteMemberLevel(){
        this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/deleteMemberLevel"
            ,{level_id:this.state.level_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"会员等级列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/member_level_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"等级ID",flex:1,key:'level_id'},
                        {name:"等级名称",flex:1,key:'level_name'},
                        {name:"消费满足金额",flex:1,key:'level_min_price'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.memberLevelBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_level_editor/"+this.state.memberLevelBeans[rowID].level_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        level_id:this.state.memberLevelBeans[rowID].level_id
                                    },()=>{
                                        this.deleteMemberLevel();
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
                            this.getMemberLevels()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberLevel;

