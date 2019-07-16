/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CaseEffect extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            yinlongBannerBean:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getBanners();
    }
    getBanners(){
        this.getDataByPost(1,maintail_homeurl+"/renovationController/v1.0/getCaseEffects"
            ,{page:this.state.page})
    }

    deleteBanner(){
        this.getDataByPost(2,maintail_homeurl+"/renovationController/v1.0/deleteCaseEffect",{effect_id:this.state.effect_id})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    yinlongBannerBean:data,
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
                            this.props.history.push("/caseeffect_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'effect_id'},
                        {name:"案列名称",flex:1,key:'effect_name'},
                        {name:"图标",flex:1,key:'effect_img',type:'img'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.yinlongBannerBean}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/caseeffect_editor/"+this.state.yinlongBannerBean[rowID].effect_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        effect_id:this.state.yinlongBannerBean[rowID].effect_id
                                    },()=>{
                                        this.deleteBanner();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,maintail_homeurl+"/renovationController/v1.0/movegetCaseEffect"
                                ,{effect_id:this.state.yinlongBannerBean[rowID].effect_id
                                    ,sort:this.state.yinlongBannerBean[rowID].sort,
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

module.exports=CaseEffect;