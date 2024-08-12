import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
      fill="black"
    />
    <Path
      d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
      fill="black"
    />
    <Path
      d="M9 17C8.44772 17 8 17.4477 8 18C8 18.5523 8.44772 19 9 19H15C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17H9Z"
      fill="black"
    />
  </Svg>
);
export default SVGComponent;