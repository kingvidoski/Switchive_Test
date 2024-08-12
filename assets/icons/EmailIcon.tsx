import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16.257}
    height={10.95}
    viewBox="0 0 16.257 10.95"
    {...props}>
    <Path
      id="message_1_"
      d="M1,9v9.95l6.3-4.743M1,18.95H16.257l-6.3-4.743M16.257,9H1l6.3,5.207m8.955,4.743V9l-6.3,5.207m-2.653,0L8.629,15.3l1.327-1.095"
      transform="translate(-0.5 -8.5)"
      fill="none"
      stroke="#c7c7c7"
      strokeLinejoin="round"
      strokeWidth={1}
    />
  </Svg>
);
export default SVGComponent;
