import React from 'react';
import {
  TimelineItem,
  AnimatedBackground,
  BackgroundMasker,
} from './styled';

function Placeholder() {
  return (
    <TimelineItem>
      <AnimatedBackground>
        <BackgroundMasker />
      </AnimatedBackground>
    </TimelineItem>
  );
}

export default Placeholder;
