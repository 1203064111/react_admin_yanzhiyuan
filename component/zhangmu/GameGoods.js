/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameGoods extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameGoodsBeans:[],
            class_id:this.props.params.class_id,
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getGameGoods();
    }
    getGameGoods(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameGoods"
            ,{page:this.state.page,
            class_id:this.state.class_id,
            },{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameGoodsBeans:data.data,
                    total:data.total
                });
                break;
                case 2:
                this.getGameGoods();
                break;
                
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
               
                <Widget.Toolbar title={"道具列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/gameGoodss_detail/-1/"+this.state.class_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'goods_id'},
                        {name:"类别",flex:1,key:'class_name'},
                        {name:"道具名称",flex:1,key:'goods_name'},
                        {name:'道具图标',flex:1,key:'goods_img',type:'img'},
                        {name:"排序",flex:1,key:'sort',type:'sort'},
                        {name:'创建时间',flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/moveGameGoods",
                                    {goods_id:this.state.gameGoodsBeans[rowID].goods_id,
                                        sort:this.state.gameGoodsBeans[rowID].sort,
                                        sort_type:value});
                                }
                                this.refresh();
                            }
                        }
                    dataSource={this.state.gameGoodsBeans}
                    operationData={[{title:"编辑"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/gameGoodss_detail/"+this.state.gameGoodsBeans[rowID].goods_id+"/"+this.state.class_id);
                                break;

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGameGoods()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=GameGoods;