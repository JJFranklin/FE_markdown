import React from "react";
import CComp from "./cComp";

class BComp extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
  }
  showName = (val?:string)=>{
    // @ts-ignore
    this.props.showName(`bbbb-${val}`);
  }
  render(): React.ReactNode {
    // @ts-ignore
    const {showAge} = this.props;
    return (
      <>
       <CComp 
       // @ts-ignore
        showAge={showAge}
        // @ts-ignore
       showName={this.showName}
       ></CComp>
      </>
    );
    
  }
}

export default BComp;