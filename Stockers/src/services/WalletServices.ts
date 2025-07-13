import api from './api';

// ─── Types ─────────────────────────────────────────────
export interface BuyAssetParams {
  userId: number;
  assetSymbol: string;
  quantity: number;
}

export interface SellAssetParams {
  userId: number;
  assetSymbol: string;
  quantity: number;
}

export interface AssetHistoryParams {
  symbol: string;
  interval?: string;
  range?: string;
}

export interface Transaction {
  id: number;
  userId: number;
  assetSymbol: string;
  quantity: number;
  pricePerShare: number;
  timestamp: string;
  type: 'buy' | 'sell';
}

export interface UserAsset {
  id: number;
  assetId: number;
  userId: number;
  quantity: number;
  avgPurchasePrice: number;
  createdAt: string;
  asset: {
    id: number;
    symbol: string;
    name: string;
  };
}

export interface AssetPricePoint {
  date: string;
  close: number;
}

export interface AssetHistory {
  symbol: string;
  history: AssetPricePoint[];
}

export interface PortfolioSnapshot {
  date: string;
  totalValue: number;
}

export interface SupportedAsset {
  id: number;
  symbol: string;
  name: string;
}

// ─── Service ───────────────────────────────────────────

export const WalletService = {
  buyAsset: async ({ userId, assetSymbol, quantity }: BuyAssetParams): Promise<boolean> => {
    try {
      const response = await api.post<boolean>('/Wallet/buy', {
        userId,
        assetSymbol,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      console.error('buyAsset WalletServices error: ', error);
      throw error.response?.data?.message || 'Buy failed';
    }
  },

  sellAsset: async ({ userId, assetSymbol, quantity }: SellAssetParams): Promise<boolean> => {
    try {
      const response = await api.post<boolean>('/Wallet/sell', {
        userId,
        assetSymbol,
        quantityToSell: quantity,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Sell failed';
    }
  },

  getAssetHistory: async ({ symbol, interval = '15m', range = '1d' }: AssetHistoryParams): Promise<AssetHistory> => {
    try {
      const response = await api.get<AssetHistory>(`/Stocks/history/${symbol}`, {
        params: { interval, range },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch asset history';
    }
  },

  getUserWallet: async (userId: number): Promise<UserAsset[]> => {
    try {
      const response = await api.get<UserAsset[]>(`/Wallet/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch wallet';
    }
  },

  getUserWalletValue: async (userId: number): Promise<number> => {
    try {
      const response = await api.get<number>(`/Wallet/portfolio/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch wallet value';
    }
  },

  getTransactions: async (userId: number): Promise<Transaction[]> => {
    try {
      const response = await api.get<Transaction[]>(`/Wallet/${userId}/transactions`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch transactions';
    }
  },

  getUserTransactions: async (userId: number, limit = 10): Promise<Transaction[]> => {
    try {
      const response = await api.get<Transaction[]>(`/Wallet/transactions/${userId}?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch transactions';
    }
  },

  getSupportedAssets: async (): Promise<SupportedAsset[]> => {
    try {
      const response = await api.get<SupportedAsset[]>('/Stocks/supported');
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch supported assets';
    }
  },

  getUserPortfolioHistory: async (userId: number): Promise<PortfolioSnapshot[]> => {
    try {
      const response = await api.get<PortfolioSnapshot[]>(`/Wallet/history/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch portfolio history';
    }
  },
};
