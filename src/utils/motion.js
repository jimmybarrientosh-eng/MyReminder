import { keyframes } from '@emotion/react';

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
`;

export const growY = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;

export const growX = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

export const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(260%); }
`;

export const motionSafe = (animation) => ({
  '@media (prefers-reduced-motion: no-preference)': { animation },
});
