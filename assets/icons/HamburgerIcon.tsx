import * as React from 'react';
import Svg, {Defs, ClipPath, Path, Rect, G} from 'react-native-svg';
const SVGComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={18}
    height={13.998}
    viewBox="0 0 18 13.998"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Path
          id="Path_20741"
          data-name="Path 20741"
          d="M42-726a.972.972,0,0,1-.993,1H34a.977.977,0,0,1-1-1,.973.973,0,0,1,.991-1H41A.981.981,0,0,1,42-726Zm8-7a1,1,0,0,1,1,1,1,1,0,0,1-1,1H34a1,1,0,0,1-1-1,1,1,0,0,1,1-1Zm-3-5a1,1,0,0,1-1.035,1H34c-.43,0-1,0-1-1,0-.944.509-1,.927-1H45.965A1,1,0,0,1,47-738Z"
          fill="none"
          clipRule="evenodd"
        />
      </ClipPath>
      <ClipPath id="clip-path-2">
        <Path
          id="Path_20740"
          data-name="Path 20740"
          d="M18-708H66v-48H18Z"
          fill="none"
        />
      </ClipPath>
      <ClipPath id="clip-path-3">
        <Rect
          id="Rectangle_2100"
          data-name="Rectangle 2100"
          width={28}
          height={24}
          transform="translate(28 -744)"
          fill="none"
        />
      </ClipPath>
      <ClipPath id="clip-path-4">
        <Path
          id="Path_20739"
          data-name="Path 20739"
          d="M33-725H51v-14H33Z"
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G
      id="Group_15214"
      data-name="Group 15214"
      transform="translate(-33 739)"
      clipPath="url(#clip-path)">
      <G id="Group_15213" data-name="Group 15213" clipPath="url(#clip-path-2)">
        <G
          id="Group_15212"
          data-name="Group 15212"
          style={{
            isolation: 'isolate',
          }}>
          <G
            id="Group_15211"
            data-name="Group 15211"
            clipPath="url(#clip-path-3)">
            <G
              id="Group_15210"
              data-name="Group 15210"
              clipPath="url(#clip-path-4)">
              <Path
                id="Path_20738"
                data-name="Path 20738"
                d="M28-744H56v24H28Z"
                fill="#192037"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
