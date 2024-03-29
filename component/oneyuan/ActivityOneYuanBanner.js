/**
 * Created by liyong on 2018/8/9.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityOneYuanBanner extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            bannerBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getBanners();
    }
    getBanners(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getBanners"
            ,{page:this.state.page})
    }

    deleteBanner(){
        this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/deleteBanner",{banner_id:this.state.banner_id})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    bannerBeans:data,
                    total:total,
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBanners();
                break;
            case 3:
                this.getBanners();
                break;

        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"轮播图列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/activity_one_yuan_banner_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'banner_id'},
                        {name:"标题",flex:1,key:'banner_title'},
                        {name:"图片",flex:1,key:'banner_img',type:'img'},
                        {name:"跳转属性",flex:1,key:'banner_type_show'},
                        {name:"商品ID",flex:1,key:'goods_id'},
                        {name:"资讯网址",flex:1,key:'information_site'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.bannerBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/activity_one_yuan_banner_editor/"+this.state.bannerBeans[rowID].banner_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        banner_id:this.state.bannerBeans[rowID].banner_id
                                    },()=>{
                                        this.deleteBanner();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/moveBanner"
                                ,{banner_id:this.state.bannerBeans[rowID].banner_id
                                    ,sort:this.state.bannerBeans[rowID].sort,
                                    sort_type:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getBanners()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=ActivityOneYuanBanner;
