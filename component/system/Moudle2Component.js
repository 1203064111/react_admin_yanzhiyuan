/**
 * Created by shenjiabo on 16/12/10.
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
var Widget = require('./../../widget/widget');

var MoudleComponent=require("./MoudleComponent");

class Moudle2Component extends Widget.Base{
    render(){
        return(
            <MoudleComponent
                history={this.props.history}
                parent_id={this.props.params.parent_id}
                level={this.props.params.level}/>

        )
    }
}
module.exports=Moudle2Component;