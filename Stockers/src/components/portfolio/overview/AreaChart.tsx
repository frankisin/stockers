import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export default function AreaChart({
  width,
  height,
  yMax,
  xScale,
  yScale,
  margin,
  data,
  gradientColor,
  hideBottomAxis,
  hideLeftAxis,
  top,
  left,
  children,
  axisColor = '#000',     // default to black
  textColor = '#000',     // default to black
}: {
  width: number;
  height?: number;
  yMax: number;
  xScale: any;
  yScale: any;
  margin: { top: number; right: number; bottom: number; left: number };
  data: any[];
  gradientColor?: string;
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
  axisColor?: string;
  textColor?: string;
}) {
  if (width < 10) return null;

  const axisBottomTickLabelProps = {
    textAnchor: 'middle' as const,
    fontFamily: 'Arial',
    fontSize: 16,
    fill: textColor,
  };

  const axisLeftTickLabelProps = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 16,
    textAnchor: 'end' as const,
    fill: textColor,
  };

  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient
        id="gradient"
        from={gradientColor}
        fromOpacity={1}
        to={gradientColor}
        toOpacity={0.2}
      />
      <AreaClosed<AppleStock>
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getStockValue(d)) || 0}
        yScale={yScale}
        strokeWidth={2}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        curve={curveMonotoneX}
      />
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisLeftTickLabelProps}
        />
      )}
      {children}
    </Group>
  );
}
