import { PositionData } from '../../../lib/hooks/useGetPosition';

export const positionActiveStyle = (
  position: string,
  positionData: PositionData,
  positionsH: 'left' | 'right' | 'base'
) => {
  switch (position) {
    case 'top':
      return {
        top: positionData.top,
        left:
          positionsH === 'left'
            ? positionData.left + positionData.width
            : positionsH === 'right'
            ? positionData.left - positionData.width
            : positionData.left,
      };
    // case 'right':
    //   return { left: positionData.left + (positionData.width || 0), top: positionData.top };
    // case 'left':
    //   return { left: positionData.left, top: positionData.top };
    default:
      return {
        top: positionData.bottom,
        left: positionsH === 'left' ? positionData.left + positionData.width : positionData.left,
      };
  }
};
