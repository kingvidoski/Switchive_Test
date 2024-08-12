import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12.989}
    height={17.068}
    viewBox="0 0 12.989 17.068"
    {...props}>
    <Path
      id="lock"
      d="M9.5,10.972a.985.985,0,0,1-.5.846v2.154H8V11.819a.984.984,0,0,1-.5-.847,1,1,0,0,1,2,0ZM14.965,8.46v7.08a1.5,1.5,0,0,1-1.5,1.5H3.476a1.5,1.5,0,0,1-1.5-1.5V8.46a1.5,1.5,0,0,1,1.5-1.5H3.5V4.972a5,5,0,0,1,10,0V6.964a1.5,1.5,0,0,1,1.465,1.5ZM4.5,6.96h8V4.972a4,4,0,0,0-8,0Zm9.465,1.5a.5.5,0,0,0-.465-.493v0H3.5V7.96H3.476a.5.5,0,0,0-.5.5v7.08a.5.5,0,0,0,.5.5h9.989a.5.5,0,0,0,.5-.5V8.46Z"
      transform="translate(-1.976 0.028)"
      fill="#9a9a9a"
    />
  </Svg>
);
export default SVGComponent;
