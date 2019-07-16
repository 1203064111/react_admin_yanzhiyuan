/**
 * Created by hwq on 2018/8/16.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberCount extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberCountBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberAddressCounts();
    }
    getMemberAddressCounts(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMemberAddressCounts",
            {page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberCountBeans:data,
                    total:total,
                });
                break;


        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户地区统计"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"地区",flex:1,key:'address_country'},
                        {name:"人数",flex:1,key:'member_count'},
                    ]}
                    dataSource={this.state.memberCountBeans}


                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberAddressCounts()
                        })
                    }}
                >
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberCount;

