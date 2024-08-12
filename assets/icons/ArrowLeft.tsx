import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    id="Right_Arrow_Icon"
    data-name="Right Arrow Icon"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}>
    <Path id="Shape" d="M0,0H24V24H0Z" fill="none" />
    <Path
      id="Combined_Shape"
      data-name="Combined Shape"
      d="M6.293,13.707a1,1,0,0,1,0-1.414L10.586,8H1A1,1,0,0,1,1,6h9.728L6.763,1.676A1,1,0,0,1,8.237.324l5.5,6a1,1,0,0,1-.05,1.4L7.707,13.707a1,1,0,0,1-1.414,0Z"
      transform="translate(5 5)"
    />
  </Svg>
);
export default SVGComponent;
