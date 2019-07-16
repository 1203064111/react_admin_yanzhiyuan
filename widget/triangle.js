/**
 * Created by sjb on 18/7/12.
 *
 * 三角形
 *
 */


import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';


class TriangleComponent extends Component{
    render(){
        return(
            <div style={{marginLeft:this.props.marginLeft?this.props.marginLeft:0}}>
                <div style={{display:this.props.direction!=="up"?"flex":"none",
                    width:14,height:20,background:"#efefef"}}>

                </div>
                <div style={{background:'red',
                    borderColor:this.props.direction==="up"?"#fff #fff #efefef #fff":"#efefef #fff #fff #fff",
                    borderStyle:"solid",
                    borderWidth:this.props.direction==="up"?"0px 7px 10px 7px":"10px 7px 0px 7px",
                    height: 0,
                    width: 0,
                    display:"flex"}}>
                </div>
                <div style={{display:this.props.direction==="up"?"flex":"none",
                    width:14,height:20,background:"#efefef"}}>

                </div>
            </div>
        )
    }
}

module.exports=TriangleComponent;