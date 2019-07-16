/**
 * Created by sjb on 18/7/31.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneGive extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,""),
            sceneBeans:[],
            page:1,
            total:0,
            scene_type:'2',
            apply_state:"2"
        };
    }

    componentDidMount() {
        this.getScenes();
    }

    getScenes(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getScenes"
            ,{page:this.state.page,
                scene_type:this.state.scene_type,
                merchants_id:this.state.merchants_id,
                apply_state:this.state.apply_state})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    sceneBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getScenes();
                break;
        }
    }


    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"立减场景"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/scene_reduce_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'scene_id'},
                        {name:"场景名称",flex:1,key:'scene_name'},
                        {name:"场景图标",flex:1,key:'scene_img',type:'img'},
                        {name:"场景价格",flex:1,key:'scene_price'},
                        {name:"场景商品数量",flex:1,key:'scene_count'},
                        {name:"优惠内容",flex:1,key:'scene_coupon_desc'},
                        {name:"开始时间",flex:1,key:'start_time'},
                        {name:"结束时间",flex:1,key:'end_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.sceneBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/scene_reduce_editor/"+this.state.sceneBeans[rowID].scene_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.getDataByPost(2,koubei_homeurl+"/sceneController/v1.0/deleteScene"
                                        ,{scene_id:this.state.sceneBeans[rowID].scene_id})
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
                            this.getSceneClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=SceneGive;