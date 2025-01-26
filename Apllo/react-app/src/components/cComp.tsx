import React from "react";

class CComp extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
  }
  showName = (val:string) => {
    // @ts-ignore
    this.props.showName(val);
  };
  render(): React.ReactNode {
    // @ts-ignore
    const {showAge} = this.props;
    return (
      <>
        <button onClick={()=>this.showName("ddddd")}>显示姓名</button>
        {showAge && <span>我 20 岁</span>}
      </>
    );
  }
}

export default CComp;
