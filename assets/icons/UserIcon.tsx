import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={19}
    viewBox="0 0 13 19"
    {...props}>
    <Path
      id="Fill_177"
      data-name="Fill 177"
      d="M9.455,19H3.546A3.558,3.558,0,0,1,0,15.437V13.062A3.555,3.555,0,0,1,2.393,9.709,6.393,6.393,0,0,1,1.182,5.937C1.182,2.663,3.567,0,6.5,0s5.318,2.663,5.318,5.937a6.393,6.393,0,0,1-1.21,3.772A3.555,3.555,0,0,1,13,13.062v2.375A3.558,3.558,0,0,1,9.455,19ZM3.413,10.766a2.714,2.714,0,0,0-2.231,2.593V15.14a2.8,2.8,0,0,0,2.9,2.672H8.918a2.8,2.8,0,0,0,2.9-2.672V13.359a2.714,2.714,0,0,0-2.23-2.593,4.855,4.855,0,0,1-6.175,0ZM6.5,1.187c-2.281,0-4.137,2.131-4.137,4.75s1.856,4.75,4.137,4.75,4.137-2.131,4.137-4.75S8.781,1.187,6.5,1.187Z"
      fill="#9a9a9a"
    />
  </Svg>
);
export default SVGComponent;
