import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class SheepBanner extends Widget.Base{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            bannerBeans:[],
        };
    }
    componentDidMount() {
        
        this.getBanners();
    
    }
    getBanners(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getBanners",{})
    }
    deleteBaneer(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteBanner",{banner_id:this.state.banner_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    bannerBeans:data,
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBanners();
                break;
                case 3:
                this.showTip("移动成功");
                this.getBanners();
                break;
            
           
        }
    }

    render(){
        let baseData=[];
        baseData= [
            {name:"ID",flex:1,key:'banner_id'},
            {name:"标题",flex:1,key:'banner_title'},
            {name:'图片',flex:1,key:'banner_img',type:'img'},
            {name:"跳转属性",flex:1,key:'banner_type_show',},
            {name:"排序",flex:1,key:'sort',type:'sort'},
            {name:"操作",flex:2,key:"-1"}];
        return(
                 <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                 <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteBaneer();
                            }}></Widget.Tip>
                 <Widget.Toolbar title={"轮播列表"} history={this.props.history}></Widget.Toolbar>
                 <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/sheepBanner_detail/-1");
                        }}/>
                </Widget.View>
                 <Widget.List
                    data={baseData}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/moveBanner",
                                    {banner_id:this.state.bannerBeans[rowID].banner_id,
                                        sort:this.state.bannerBeans[rowID].sort,
                                        sort_type:value});
                                }
                                this.refresh();
                            }
                        }
                    dataSource={this.state.bannerBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/sheepBanner_detail/"+this.state.bannerBeans[rowID].banner_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    banner_id:this.state.bannerBeans[rowID].banner_id
                                })
                                break;
                        }
                    }}
                    >
                </Widget.List>


                 </div>

        )
    }

}
module.exports=SheepBanner;