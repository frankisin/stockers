'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { walletItems } from './mockData';

const width = 150;
const height = 45;

export function Wallet() {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: 'white',
                mt: 2,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Your Holdings
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                {walletItems.map(({ ticker, price, change, data }) => {
                    const yExtent = extent(data);
                    const yScale = scaleLinear({
                        domain:
                            yExtent[0] != null && yExtent[1] != null
                                ? (yExtent as [number, number])
                                : [0, 1],
                        range: [height, 0],
                    });

                    const xScale = scaleLinear({
                        domain: [0, data.length - 1],
                        range: [0, width],
                    });

                    const isUp = data[data.length - 1] >= data[0];
                    const color = isUp ? '#00C853' : '#D50000';

                    return (
                        <Paper
                            key={ticker}
                            elevation={1}
                            sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: 2,
                                width: '100%',
                                marginBottom: '5px',
                                backgroundColor: 'white',
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2">{ticker}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${price.toFixed(2)} ({change > 0 ? '+' : ''}{change}%)
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <svg width={width} height={height * 1.2}>
                                    <LinePath
                                        data={data}
                                        x={(d, i) => xScale(i)}
                                        y={(d) => yScale(d)}
                                        stroke={color}
                                        strokeWidth={1.5}
                                    />
                                </svg>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>
        </Paper>
    );
}
