/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Broad extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            broadBeans:[],
           
        };
    }

    componentDidMount() {
        this.getBroads();
    }
    getBroads(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getBroads",{})
    }

    deleteBroad(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteBroad",{broad_id:this.state.broad_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    broadBeans:data,
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBroads();
                break;
                case 3:
                this.showTip("移动成功")
                this.getBroads();
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
                                this.deleteBroad();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"分类列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/sheepBroad_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'broad_id'},
                        {name:"名称",flex:1,key:'broad_title'},
                        {name:'图片',flex:1,key:'broad_img',type:'img'},
                        {name:"跳转属性",flex:1,key:'broad_type_show'},
                        {name:"排序",flex:1,key:'sort',type:'sort'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/moveBroad",
                                    {broad_id:this.state.broadBeans[rowID].broad_id,
                                        sort:this.state.broadBeans[rowID].sort,
                                        sort_type:value});
                                }
                                this.refresh();
                            }
                        }

                    dataSource={this.state.broadBeans}
                  
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/sheepBroad_detail/"+this.state.broadBeans[rowID].broad_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    broad_id:this.state.broadBeans[rowID].broad_id
                                })
                                break;
                        }
                    }}
                    >
                </Widget.List>
            </div>
        );
    }
}

module.exports=Broad;