/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneMarketing extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,"-1"),
            marketing_type:this.isNull(systemAccountBean.merchants_id)?"1":"2",
            marketingSceneBeans:[],
            page:1,
            total:0,

            sceneBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[]
        };
    }

    componentDidMount() {
        this.getSceneMarketings();
        this.getSceneOutMarketing();

    }
    getSceneMarketings(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getSceneMarketings"
            ,{page:this.state.page,marketing_type:this.state.marketing_type,merchants_id:this.state.merchants_id==="-1"?"":this.state.merchants_id},{type:2})
    }

    deleteActivityGoods(){
        this.getDataByPost(2,koubei_homeurl+"/sceneController/v1.0/deleteSceneMarketing",{marketing_id:this.state.marketing_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    marketingSceneBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSceneMarketings();
                this.getSceneOutMarketing();
                break;
            case 3:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[]
                })
                this.getSceneMarketings()
                this.getSceneOutMarketing();
                break;
            case 4:
                this.setState({
                    sceneBeans:data,
                    goods_total:total
                })
                break;
        }
    }

    getSceneOutMarketing(){
        this.getDataByPost(4,koubei_homeurl+"/sceneController/v1.0/getSceneOutMarketing",
            {page:this.state.goods_page,
                merchants_id:this.state.merchants_id==="-1"?"":this.state.merchants_id,
                scene_name:this.state.scene_name,
                marketing_type:this.state.marketing_type})
    }

    insertGoodsMarketings(){
        this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/insertSceneMarketings",
            {scene_id:this.state.goods_arr.toString(),
                marketing_type:this.state.marketing_type,})
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
                                this.deleteActivityGoods();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"推荐场景"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.openHtml("#goods","请选择场景");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'marketing_id'},
                        {name:"场景id",flex:1,key:'scene_id'},
                        {name:"场景名称",flex:1,key:'scene_name'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.marketingSceneBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    marketing_id:this.state.marketingSceneBeans[rowID].marketing_id
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
                            this.getSceneMarketings()
                        })
                    }}>
                </Widget.List>
                {this.renderGoods()}
            </div>
        );
    }

    renderGoods() {
        return (
            <div id="goods" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="场景名称"
                        value={this.state.scene_name}
                        onChange={(value)=> {
                            this.setState({
                                scene_name: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getSceneOutMarketing();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertGoodsMarketings();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "场景id", flex: 1, key: 'scene_id'},
                        {name: "场景名称", flex: 1, key: 'scene_name'}
                    ]}
                    dataSource={this.state.sceneBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="scene_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.goods_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_arr,key)
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_page: page
                        }, ()=> {
                            this.getSceneOutMarketing()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=SceneMarketing;