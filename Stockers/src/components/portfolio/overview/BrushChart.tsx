/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { Brush } from '@visx/brush';
import { Bounds } from '@visx/brush/lib/types';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import { PatternLines } from '@visx/pattern';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { max, extent } from '@visx/vendor/d3-array';
import { BrushHandleRenderProps } from '@visx/brush/lib/BrushHandle';
import AreaChart from './AreaChart';

const stock = appleStock.slice(1000);
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
export const accentColor = '#00ff99';
export const background = '#ffffff';
export const background2 = '#00ff99';

const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: '#333',
};

const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export type BrushProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
};

function BrushChart({
  compact = false,
  width,
  height,
  margin = { top: 20, left: 50, bottom: 20, right: 20 },
}: BrushProps) {
  const brushRef = useRef<BaseBrush | null>(null);
  const [filteredStock, setFilteredStock] = useState(stock);

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { x0, x1, y0, y1 } = domain;
    const stockCopy = stock.filter((s) => {
      const x = getDate(s).getTime();
      const y = getStockValue(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });
    setFilteredStock(stockCopy);
  };

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact ? chartSeparation / 2 : chartSeparation + 10;
  const topChartHeight = 1 * innerHeight;
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;

  const chartContentWidth = width; // or a fixed number like 700
  const chartContentX = (width - chartContentWidth) / 2;

  const yMax = Math.max(topChartHeight, 0);
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);
  const xMax = Math.max(chartContentWidth - margin.left - margin.right, 0);
  const xBrushMax = Math.max(chartContentWidth - brushMargin.left - brushMargin.right, 0);




  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(filteredStock, getDate) as [Date, Date],
      }),
    [xMax, filteredStock],
  );

  const stockScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, max(filteredStock, getStockValue) || 0],
        nice: true,
      }),
    [yMax, filteredStock],
  );

  const brushDateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xBrushMax],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [xBrushMax],
  );

  const brushStockScale = useMemo(
    () =>
      scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, max(stock, getStockValue) || 0],
        nice: true,
      }),
    [yBrushMax],
  );

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: brushDateScale(getDate(stock[50])) },
      end: { x: brushDateScale(getDate(stock[100])) },
    }),
    [brushDateScale],
  );

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`} // <-- make content scale to `width`
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        background: background,
        overflow: 'hidden',
      }}
    >
      <text
        x={margin.left + 10}
        y={margin.top - 60}
        dy="1em"
        fontSize={30}
        fontWeight="500"
        fill="#111"
        fontFamily="Inter, sans-serif"
      >
        Your Earnings
      </text>


      <LinearGradient id={GRADIENT_ID} from={background} to={background2} rotate={90} />
      <rect x={0} y={0} width={width} height={height} fill={`url(#${GRADIENT_ID})`} rx={14} />

      <AreaChart
        hideBottomAxis={compact}
        data={filteredStock}
        width={chartContentWidth}
        margin={{ ...margin, bottom: topChartBottomMargin }}
        yMax={yMax}
        xScale={dateScale}
        yScale={stockScale}
        gradientColor={background2}
        axisColor="#000"
        textColor="#000"
      />
      <foreignObject
        x={0}
        width={width}
        y={topChartHeight + topChartBottomMargin + margin.top}
        height={120}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            padding: '1rem',
            backgroundColor: '#ffffffcc',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            color: '#333',
          }}
        >
          {[
            [
              ['Open', '$5.00'],
              ['Avg', '$5.01'],
            ],
            [
              ['High', '$5.25'],
              ['Low', '$4.83'],
            ],
            [
              ['52W H', '$5.25'],
              ['52W L', '$4.83'],
            ],
            [
              ['Vol', '82.77K'],
              ['Yield', '3.38%'],
            ],
            [
              ['Drawdown', '-8%'],
              ['Daily Change', '+0.32%'],
            ],
          ].map((pair, idx, arr) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
                borderLeft: idx === 0 ? 'none' : '1px solid #ddd',
                borderRight: idx === arr.length - 1 ? 'none' : '1px solid #ddd',
                minWidth: '110px',
                textAlign: 'center',
              }}
            >
              {pair.map(([label, value]) => (
                <div key={label} style={{ marginBottom: '0.25rem' }}>
                  <strong>{label}:</strong> <span>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </foreignObject>






    </svg>
  );
}

function BrushHandle({ x, height, isBrushActive }: BrushHandleRenderProps) {
  const pathWidth = 8;
  const pathHeight = 15;
  if (!isBrushActive) return null;

  return (
    <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999"
        strokeWidth="1"
        style={{ cursor: 'ew-resize' }}
      />
    </Group>
  );
}

export default BrushChart;