'use client';

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { useUserContext } from '../../../contexts/user-context';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Alert, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { enqueueSnackbar } from 'notistack';

const width = 120;
const height = 45;

export function Wallet() {
    const { user, walletService, checkSession, refreshBalance } = useUserContext();

    const [walletItems, setWalletItems] = useState<any[]>([]);
    const [trendMap, setTrendMap] = useState<Record<string, number[]>>({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
    const [selectedTicker, setSelectedTicker] = useState('');
    const [availableQty, setAvailableQty] = useState<number | null>(null);
    const [quantity, setQuantity] = useState('');

    const [allAssets, setAllAssets] = useState<any[]>([]);
    const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [transactionError, setTransactionError] = useState<string | null>(null);

    const subtotal = selectedPrice && quantity ? selectedPrice * Number(quantity) : 0;
    const fee = subtotal * 0.03;
    const total = subtotal + (tradeType === 'buy' ? fee : -fee);


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

    const hasHoldings = walletItems.length > 0;



    return (
        <>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: 'white', mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                        Your Holdings
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        disabled={!user?.ID}
                        onClick={async () => {
                            if (!user?.ID) return;

                            setDialogOpen(true);
                            try {
                                const supported = await walletService.getSupportedAssets();
                                setAllAssets(supported);
                            } catch (e) {
                                console.error('Failed to load supported assets');
                            }
                        }}
                    >
                        Buy / Sell
                    </Button>


                </Box>


                <Box
                sx={{
                    position: 'relative',
                    maxHeight: 3 * 88,
                    overflowY: 'auto',
                    pr: 1,
                }}
                >
                <Box
                    sx={{
                    position: 'sticky',
                    bottom: 0,
                    height: '24px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
                    zIndex: 1,
                    pointerEvents: 'none',
                    }}
                />

                    {walletItems.map((item) => {
                        const { Id, Quantity, AvgPurchasePrice, Asset } = item;
                        const average = typeof AvgPurchasePrice === 'number' ? AvgPurchasePrice : 0;
                        const trend = trendMap[Asset?.Symbol] || [average, average * 1.05, average * 0.95];
                        const rawExtent = extent(trend);
                        const minValue = rawExtent[0] ?? 0;
                        const maxValue = rawExtent[1] ?? 1;
                        const padding = 0.001;
                        let min = minValue * (1 - padding);
                        let max = maxValue * (1 + padding);
                        if (Math.abs(max - min) < 1) {
                            const mid = (min + max) / 2;
                            min = mid - 0.5;
                            max = mid + 0.5;
                        }
                        const yScale = scaleLinear({ domain: [min, max], range: [height, 0] });
                        const xScale = scaleLinear({ domain: [0, trend.length - 1], range: [0, width] });
                        const isUp = trend[trend.length - 1] >= trend[0];
                        const color = isUp ? '#00C853' : '#D50000';

                        return (
                            <Paper
                                key={Id}
                                elevation={1}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    gap: 2
                                }}
                            >
                                <Box sx={{ flex: 1,minWidth: 0 }}>
        
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%',
                                            display: 'block',
                                        }}
                                        >
                                        {Asset?.Name} ({Asset?.Symbol})
                                        </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color,
                                            fontWeight: 500,
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mt: 0.5,
                                        }}
                                    >
                                        {isUp ? '▲' : '▼'} ${Math.abs((trend.at(-1) ?? 0) - (trend[0] ?? 0)).toFixed(2)} (
                                        {Math.abs((((trend.at(-1) ?? 0) - (trend[0] ?? 1)) / (trend[0] ?? 1)) * 100).toFixed(2)}%) today
                                    </Typography>
                                </Box>
                                <Box
                                sx={{
                                    width: width,
                                    minWidth: width,
                                    height: height * 1.2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                }}
                                >
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox={`0 0 ${width} ${height * 1.2}`}
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <LinePath
                                    data={trend}
                                    x={(d, i) => xScale(i)}
                                    y={(d) => yScale(d)}
                                    stroke={color}
                                    strokeWidth={1.5}
                                    fill="none"
                                    />
                                </svg>
                                </Box>


                            </Paper>
                        );
                    })}
                </Box>
            </Paper>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
                <React.Fragment>
                    <DialogTitle
                        sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            color: 'text.primary',
                        }}
                    >
                        Buy / Sell Asset
                    </DialogTitle>

                    <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Transaction Type"
                            select
                            fullWidth
                            SelectProps={{ native: true }}
                            value={tradeType}
                            onChange={(e) => {
                                setTradeType(e.target.value as 'buy' | 'sell');
                                setSelectedTicker('');
                                setAvailableQty(null);
                            }}
                            sx={{ mb: 2 }}
                        >
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </TextField>





                        {tradeType === 'buy' ? (
                            <>
                                <TextField
                                    label="Search Stocks/Crypto"
                                    variant="outlined"
                                    fullWidth
                                    value={selectedTicker}
                                    onChange={(e) => {
                                        const val = e.target.value.toUpperCase();
                                        setSelectedTicker(val);
                                        setSelectedPrice(null);

                                        const matches = allAssets.filter((asset) =>
                                            asset.Symbol.toUpperCase().includes(val) ||
                                            asset.Name.toUpperCase().includes(val)
                                        );

                                        setFilteredAssets(matches.slice(0, 5));
                                    }}

                                    sx={{ mb: 1 }}
                                />

                                {/* 🔽 INSERT THE SUGGESTIONS HERE 🔽 */}
                                {tradeType === 'buy' && filteredAssets.length > 0 && (
                                    <Box
                                        sx={{
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                            mt: 1,
                                            maxHeight: '150px',
                                            overflowY: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            p: 1,
                                        }}
                                    >
                                        {filteredAssets.map((asset) => (
                                            <Button
                                                key={asset.Symbol}
                                                variant={selectedTicker === asset.Symbol ? 'contained' : 'outlined'}
                                                size="small"
                                                onClick={async () => {
                                                    setSelectedTicker(asset.Symbol);
                                                    setFilteredAssets([]);

                                                    try {
                                                        const history = await walletService.getAssetHistory({symbol:asset.Symbol,interval:'5m'});
                                                        const latestPrice = history?.[history.length - 1]?.Price ?? null;
                                                        setSelectedPrice(latestPrice);
                                                    } catch (err) {
                                                        console.error('Failed to fetch price:', err);
                                                        setSelectedPrice(null);
                                                    }
                                                }}
                                                sx={{
                                                    justifyContent: 'space-between',
                                                    textTransform: 'none',
                                                    fontSize: '.85rem',
                                                }}
                                            >
                                                {asset.Name} ({asset.Symbol})
                                            </Button>

                                        ))}
                                    </Box>

                                )}
                                {selectedTicker && (
                                    <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                        Selected: <strong>
                                            {allAssets.find(a => a.Symbol === selectedTicker)?.Name ?? 'Unknown'} ({selectedTicker})
                                        </strong>
                                    </Typography>
                                )}

                                {selectedPrice !== null && (
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                        Current Price: <strong>${selectedPrice.toFixed(2)}</strong> / Share
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Select a stock to sell:
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        border: '1px solid #eee',
                                        borderRadius: 2,
                                        p: 1,
                                    }}
                                >
                                    {walletItems.map((item) => {
                                        const symbol = item.Asset?.Symbol;
                                        const name = item.Asset?.Name;
                                        return (
                                            <Button
                                                key={item.Id}
                                                variant={selectedTicker === symbol ? 'contained' : 'outlined'}
                                                size="small"
                                                onClick={() => {
                                                    setSelectedTicker(symbol);
                                                    setAvailableQty(item.Quantity);
                                                }}
                                                sx={{
                                                    justifyContent: 'space-between',
                                                    fontSize: '.85rem',
                                                    textTransform: 'none',
                                                    px: 2,
                                                }}
                                            >
                                                {name} ({symbol}) <span>Qty: {item.Quantity}</span>
                                            </Button>
                                        );
                                    })}
                                </Box>
                            </>
                        )}
                        {transactionError && (
                            <Alert severity="error">
                                {(transactionError instanceof Error) ? transactionError.message : transactionError}
                            </Alert>
                        )}

                        <TextField
                            label="Quantity"
                            type="number"
                            inputProps={{ min: 1 }} // set minimum to 1
                            variant="outlined"
                            fullWidth
                            disabled={!selectedTicker}
                            value={quantity}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val < 1) return;
                                setQuantity(e.target.value);
                            }}
                            sx={{ mt: 2 }}
                            helperText={
                                tradeType === 'sell' && availableQty !== null
                                    ? `You own ${availableQty} shares`
                                    : ''
                            }
                        />
                        {selectedPrice !== null && Number(quantity) > 0 && (
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {/* Subtotal */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Subtotal</Typography>
                                    <Typography variant="body2"><strong>${(selectedPrice * Number(quantity)).toFixed(2)}</strong></Typography>
                                </Box>

                                {/* Fee with Tooltip */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Typography variant="body2">Transaction Fee (3%)</Typography>
                                        <Tooltip title="A 3% service fee is applied to all buy and sell transactions to support platform operations.">
                                            <InfoOutlinedIcon fontSize="small" color="action" sx={{ cursor: 'pointer' }} />
                                        </Tooltip>
                                    </Box>
                                    <Typography variant="body2"><strong>${((selectedPrice * Number(quantity)) * 0.03).toFixed(2)}</strong></Typography>
                                </Box>

                                {/* Total */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Total</Typography>
                                    <Typography variant="body2">
                                        <strong>
                                            ${((selectedPrice * Number(quantity)) * 1.03).toFixed(2)}
                                        </strong>
                                    </Typography>
                                </Box>
                            </Box>
                        )}





                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                if (!selectedTicker || !quantity || Number(quantity) <= 0) return;

                                setTransactionError(null);
                                const qty = Number(quantity);
                                const previousWallet = [...walletItems];

                                try {
                                    if (tradeType === 'buy') {
                                        // Optimistically update wallet
                                        const existing = walletItems.find(i => i.Asset?.Symbol === selectedTicker);
                                        const newQty = existing ? existing.Quantity + qty : qty;
                                        const updatedWallet = existing
                                            ? walletItems.map(i =>
                                                i.Asset?.Symbol === selectedTicker
                                                    ? { ...i, Quantity: newQty }
                                                    : i
                                            )
                                            : [
                                                ...walletItems,
                                                {
                                                    Id: Date.now(), // temp ID
                                                    Quantity: newQty,
                                                    AvgPurchasePrice: selectedPrice,
                                                    Asset: {
                                                        Symbol: selectedTicker,
                                                        Name:
                                                            allAssets.find(a => a.Symbol === selectedTicker)?.Name ||
                                                            selectedTicker,
                                                    },
                                                },
                                            ];

                                        setWalletItems(updatedWallet);

                                        const response = await walletService.buyAsset({
                                            userId: user?.ID,
                                            assetSymbol: selectedTicker,
                                            quantity: qty,
                                        });

                                        if (response?.ValidationErrors?.length) {
                                            throw new Error(response.ValidationErrors.join(' '));
                                        }

                                        enqueueSnackbar('Purchase successful!', { variant: 'success' });
                                    } else {
                                        // Optimistically deduct quantity or remove asset
                                        const existing = walletItems.find(i => i.Asset?.Symbol === selectedTicker);
                                        if (!existing || existing.Quantity < qty) {
                                            throw new Error('Insufficient quantity');
                                        }

                                        const remainingQty = existing.Quantity - qty;
                                        const updatedWallet = remainingQty > 0
                                            ? walletItems.map(i =>
                                                i.Asset?.Symbol === selectedTicker
                                                    ? { ...i, Quantity: remainingQty }
                                                    : i
                                            )
                                            : walletItems.filter(i => i.Asset?.Symbol !== selectedTicker);

                                        setWalletItems(updatedWallet);

                                        const response = await walletService.sellAsset({
                                            userId: user?.ID,
                                            assetSymbol: selectedTicker,
                                            quantity: qty,
                                        });

                                        if (response?.ValidationErrors?.length) {
                                            throw new Error(response.ValidationErrors.join(' '));
                                        }

                                        enqueueSnackbar('Sale successful!', { variant: 'success' });
                                    }

                                    await checkSession();
                                    await refreshBalance();

                                    // Refresh wallet and reset form
                                    const refreshed = await walletService.getUserWallet(user?.ID);
                                    setWalletItems(refreshed.Data || []);
                                    setDialogOpen(false);
                                    setSelectedTicker('');
                                    setQuantity('');
                                    setAvailableQty(null);
                                    setSelectedPrice(null);
                                } catch (err: any) {
                                    setWalletItems(previousWallet); // rollback
                                    const message =
                                        err instanceof Error
                                            ? err.message
                                            : typeof err === 'string'
                                                ? err
                                                : 'Something went wrong.';

                                    setTransactionError(message);
                                    enqueueSnackbar(
                                        tradeType === 'buy'
                                            ? 'Purchase failed. ' + message
                                            : 'Sale failed. ' + message,
                                        { variant: 'error' }
                                    );
                                }
                            }}
                        >
                            Submit
                        </Button>


                    </DialogActions>
                </React.Fragment>
            </Dialog>
        </>
    );
}

