import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
import { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import '../../../styles/theme/components/areachart.css'

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
  axisColor = '#B0B0B0', // Light grey

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
        from="#00C853"       // vibrant green top
        fromOpacity={0.2}    // increase opacity for stronger color
        to="#00C853"
        toOpacity={0.01}     // very transparent bottom
      />
      <AreaClosed<AppleStock>
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getStockValue(d)) || 0}
        yScale={yScale}
        strokeWidth={2}
        stroke="#00C853" 
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
          axisLineClassName="custom-axis-line" 
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisLeftTickLabelProps}
          axisLineClassName="custom-axis-line"
        />
      )}

      {children}
    </Group>
  );
}
