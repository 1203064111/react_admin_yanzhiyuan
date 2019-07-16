/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class PositionDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            position_id:this.props.params.position_id,
            positionBean:[],
        };
    }

    componentDidMount() {
        this.getPositionDetail();
    }



    getPositionDetail(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getPosition",
            {position_id:this.state.position_id});
    }



    doSuccess(index,data){
        switch(index){

            case 1:
                this.setState({
                    positionBean:data,
                });
                break;

        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"职位详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="公司信息"
                    baseData={[
                        {name:"认证id",flex:1,key:'material_id',type:'text'},
                        {name:"认证名称",flex:1,key:'material_name',type:'text'},
                        {name:"职位标题",flex:1,key:'position_title',type:'text'},
                        {name:"职位类型",flex:1,key:'position_type_show',type:'text'},
                        {name:"职位工作类型",flex:1,key:'position_class_names',type:'text'},
                        {name:"职位状态",flex:1,key:'position_state_show',type:'text'},
                        {name:"邀请人数",flex:1,key:'invitation_num',type:'text'},
                        {name:"职位详情",flex:1,key:'position_specific',type:'text'},
                        {name:"薪酬（单人）",flex:1,key:'final_price',type:'text'},
                        {name:"开始时间",flex:1,key:'start_time',type:'text'},
                        {name:"结束时间",flex:1,key:'end_time',type:'text'},
                        {name:"职位图片",flex:1,key:'position_img1',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                        {name:"职位视频",flex:1,key:'position_video1',type:'video',img_style:{marginLeft:10,width:100,height:100}},
                        {name:"省",flex:1,key:'position_provider',type:'text'},
                        {name:"市",flex:1,key:'position_city',type:'text'},
                        {name:"区",flex:1,key:'position_country',type:'text'},
                        {name:"详细地址",flex:1,key:'position_address',type:'text'},
                        {name:"审核状态",flex:1,key:'position_state_show',type:'text'},
                        {name:"创建时间",flex:1,key:'create_time',type:'textDate'},
                        {name:"修改时间",flex:1,key:'update_time',type:'textDate'}
                    ]}
                    data={this.state.positionBean}

                />




            </div>
        )
    }
}



module.exports=PositionDetail;
