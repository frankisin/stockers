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

  getUserWallet: async (userId) => {
    try {
      const response = await api.get(`/Wallet/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch wallet';
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
