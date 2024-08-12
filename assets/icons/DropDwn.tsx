import * as React from 'react';
import Svg, {Defs, ClipPath, Path, Rect, G} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={7.636}
    height={4.364}
    viewBox="0 0 7.636 4.364"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Path
          id="Path_22614"
          data-name="Path 22614"
          d="M86.182-521.182h7.636v4.364H86.182Z"
          fill="none"
          clipRule="evenodd"
        />
      </ClipPath>
      <ClipPath id="clip-path-2">
        <Path
          id="Path_22613"
          data-name="Path 22613"
          d="M0,0H375V-812H0Z"
          fill="none"
        />
      </ClipPath>
      <ClipPath id="clip-path-3">
        <Rect
          id="Rectangle_2267"
          data-name="Rectangle 2267"
          width={8}
          height={6}
          transform="translate(86 -522)"
          fill="none"
        />
      </ClipPath>
      <ClipPath id="clip-path-4">
        <Path
          id="Path_22612"
          data-name="Path 22612"
          d="M92.887-521.022a.546.546,0,0,1,.771,0,.546.546,0,0,1,0,.772l-3.273,3.273a.545.545,0,0,1-.755.016l-3.273-3a.545.545,0,0,1-.033-.771.544.544,0,0,1,.77-.034l2.888,2.647Z"
          fill="none"
          clipRule="evenodd"
        />
      </ClipPath>
      <ClipPath id="clip-path-5">
        <Path
          id="Path_22611"
          data-name="Path 22611"
          d="M86-516h8v-6H86Z"
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G
      id="Group_17391"
      data-name="Group 17391"
      transform="translate(-86.182 521.182)"
      clipPath="url(#clip-path)">
      <G id="Group_17390" data-name="Group 17390" clipPath="url(#clip-path-2)">
        <G
          id="Group_17389"
          data-name="Group 17389"
          style={{
            isolation: 'isolate',
          }}>
          <G
            id="Group_17388"
            data-name="Group 17388"
            clipPath="url(#clip-path-3)">
            <G
              id="Group_17387"
              data-name="Group 17387"
              clipPath="url(#clip-path-4)">
              <G
                id="Group_17386"
                data-name="Group 17386"
                clipPath="url(#clip-path-5)">
                <Path
                  id="Path_22610"
                  data-name="Path 22610"
                  d="M81.182-526.182H98.818v14.364H81.182Z"
                  fill="#081f57"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
