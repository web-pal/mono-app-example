import styled from 'styled-components';

export const TimelineItem = styled.div`
  padding-top: 0px;
  margin: 0 auto;
  height: 25px;
`;

export const AnimatedBackground = styled.div`
  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
      }
    100%{
      background-position: 468px 0
    }
  }
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #f7f7f7 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 25px;
  position: relative;  
`;

export const BackgroundMasker = styled.div`
  .background-masker {
  background: #fff;
  position: absolute;
}

/* Every thing below this is just positioning */

.background-masker.header-top,
.background-masker.header-bottom,
.background-masker.subheader-bottom {
  top: 0;
  left: 0px;
  right: 0;
  height: 0px;
}

.background-masker.header-left,
.background-masker.subheader-left,
.background-masker.header-right,
.background-masker.subheader-right {
  top: 10px;
  left: 40px;
  height: 8px;
  width: 10px;
}

.background-masker.header-bottom {
  top: 18px;
  height: 6px;
}

.background-masker.subheader-left,
.background-masker.subheader-right {
  top: 24px;
  height: 6px;
}


.background-masker.header-right,
.background-masker.subheader-right {
  width: auto;
  left: 300px;
  right: 0;
}

.background-masker.subheader-right {
  left: 230px;
}

.background-masker.subheader-bottom {
  top: 30px;
  height: 10px;
}

.background-masker.content-top,
.background-masker.content-second-line,
.background-masker.content-third-line,
.background-masker.content-second-end,
.background-masker.content-third-end,
.background-masker.content-first-end {
  top: 40px;
  left: 0;
  right: 0;
  height: 6px;
}

.background-masker.content-top {
  height:20px;
}

.background-masker.content-first-end,
.background-masker.content-second-end,
.background-masker.content-third-end{
  width: auto;
  left: 380px;
  right: 0;
  top: 60px;
  height: 8px;
}

.background-masker.content-second-line  {
  top: 68px;
}

.background-masker.content-second-end {
  left: 420px;
  top: 74px;
}

.background-masker.content-third-line {
  top: 82px;
}

.background-masker.content-third-end {
  left: 300px;
  top: 88px;
}

.error {
  color: red;
  margin-left: 10px;
}
 `;
