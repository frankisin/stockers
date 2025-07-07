export interface WalletItem {
  id: number;
  userId: number;
  assetId: number;
  quantity: number;
  avgPurchasePrice: number;
  createdAt: string;
  assetSymbol?: string; // Only if you include asset info from the backend
}
