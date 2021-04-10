import React, { Component } from "react";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "franklin",
      sex: "male",
    };

    this.clickAlert = this.clickAlert.bind(this);
  }

  clickAlert() {
    console.log("测试事件！");
  }
// 类似于 vue 中的 mounted
  componentDidMount() {}

//  react 中控制组件是否更新
  shouldComponentUpdate() {}

//  类似于 vue 中的 updated 
  componentDidUpdate() {}

//  类似于 vue 中的 destoryed
  componentWillUnmount() {}

  render() {
    let { name, sex } = this.state;
    return (
      <div onClick={this.clickAlert}>
        name:{name}| sex:{sex}
      </div>
    );
  }
}
