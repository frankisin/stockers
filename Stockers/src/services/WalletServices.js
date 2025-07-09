import api from './api';

export const WalletService = {
  buyAsset: async ({ userId, assetSymbol, quantity }) => {
    try {
      const response = await api.post('/Wallet/buy', {
        userId,
        assetSymbol,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.log('buyAsset WalletServices error: ', error);
      throw error.response?.data?.message || 'Buy failed';
    }
  },

  sellAsset: async ({ userId, assetSymbol, quantity }) => {
    try {
      const response = await api.post('/Wallet/sell', {
        userId,
        assetSymbol,
        quantityToSell: quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Sell failed';
    }
  },
  getAssetHistory: async ({ symbol, interval = '15m', range = '1d' }) => {
    try {
      const response = await api.get(`/Stocks/history/${symbol}`, {
        params: { interval, range },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch asset history';
    }
  },
  getUserWallet: async (userId) => {
    try {
      const response = await api.get(`/Wallet/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch wallet';
    }
  },
  getUserWalletValue: async (userId) => {
    try {
      const response = await api.get(`/Wallet/portfolio/${userId}`);
      console.log("Portfolio value: ", response.data)
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch wallet value';
    }
  },

  getTransactions: async (userId) => {
    try {
      const response = await api.get(`/Wallet/${userId}/transactions`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch transactions';
    }
  },

  getSupportedAssets: async () => {
    try {
      const response = await api.get('/Stocks/supported');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch supported assets';
    }
  }
};
