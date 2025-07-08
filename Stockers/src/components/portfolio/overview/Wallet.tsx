'use client';

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { useUserContext } from '../../../contexts/user-context';

const width = 120;
const height = 35;

export function Wallet() {
    const { user, walletService } = useUserContext();
    const [walletItems, setWalletItems] = useState<any[]>([]);
    const [trendMap, setTrendMap] = useState<Record<string, number[]>>({});

    useEffect(() => {
        const fetchWallet = async () => {
            if (!user?.ID) {
                console.warn('User not ready:', user);
                return;
            }

            try {
                const response = await walletService.getUserWallet(user.ID);
                if (response?.Data) {
                    setWalletItems(response.Data);
                } else {
                    console.warn('No wallet data returned');
                }
            } catch (err) {
                console.error('Error fetching wallet:', err);
            }
        };

        fetchWallet();
    }, [user, walletService]);

    useEffect(() => {
        const fetchAllTrends = async () => {
            const trends: Record<string, number[]> = {};
            await Promise.all(
                walletItems.map(async (item) => {
                    const symbol = item.Asset?.Symbol;
                    if (!symbol) return;
                    try {
                        const history = await walletService.getAssetHistory(symbol);
                        trends[symbol] = history.map((h: any) => h.Price);
                    } catch (err) {
                        console.error(`Error fetching trend for ${symbol}`, err);
                        trends[symbol] = [];
                    }
                })
            );
            setTrendMap(trends);
        };

        if (walletItems.length > 0) {
            fetchAllTrends();
        }
    }, [walletItems, walletService]);

    if (!walletItems || walletItems.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: 'white', mt: 2 }}>
                <Typography variant="h6">Your Holdings</Typography>
                <Typography variant="body2" color="text.secondary">No holdings to display.</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: 'white', mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Your Holdings
            </Typography>

            <Box
                sx={{
                    position: 'relative',
                    maxHeight: 3 * 88,
                    overflowY: 'auto',
                    pr: 1,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '24px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
                        pointerEvents: 'none',
                    },
                }}
            >
                {walletItems.map((item) => {
                    const {
                        Id,
                        Quantity,
                        AvgPurchasePrice,
                        Asset
                    } = item;

                    const average = typeof AvgPurchasePrice === 'number' ? AvgPurchasePrice : 0;
                    const trend = trendMap[Asset?.Symbol] || [average, average * 1.05, average * 0.95];
                    const rawExtent = extent(trend);
                    const padding = 0.001; // 0.1% padding

                    const minValue = rawExtent[0] ?? 0;
                    const maxValue = rawExtent[1] ?? 1;

                    let min = minValue * (1 - padding);
                    let max = maxValue * (1 + padding);

                    // If the range is too small, artificially inflate it
                    if (Math.abs(max - min) < 1) {
                        const mid = (min + max) / 2;
                        min = mid - 0.5;
                        max = mid + 0.5;
                    }

                    const yScale = scaleLinear({
                        domain: [min, max],
                        range: [height, 0],
                    });
                    const xScale = scaleLinear({
                        domain: [0, trend.length - 1],
                        range: [0, width],
                    });

                    const isUp = trend[trend.length - 1] >= trend[0];
                    const color = isUp ? '#00C853' : '#D50000';

                    return (
                        <Paper
                            key={Id}
                            elevation={1}
                            sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: 2,
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
                                    <Typography variant="subtitle1" noWrap>
                                        {Asset?.Name} ({Asset?.Symbol})
                                    </Typography>

                                </Box>



                                <Typography variant="body2" color="text.secondary">
                                    Qty: {Quantity ?? 'N/A'} • Avg: ${average.toFixed(2)}
                                    <Typography
                                        component="span"
                                        sx={{ color, fontSize: '.7rem', fontWeight: 300, whiteSpace: 'nowrap' }}
                                    >
                                        {isUp ? '▲' : '▼'}
                                    </Typography>
                                </Typography>
                            </Box>


                            <Box sx={{ mb: 1 }}>
                                <svg width={width} height={height * 1.2}>
                                    <LinePath
                                        data={trend}
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
