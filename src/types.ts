export type PlatformType = 'MT4' | 'MT5' | 'Both';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Prop Firm Safe';

export interface ForexEAPreset {
  id: string;
  name: string;
  filename: string;
  description: string;
  targetRiskPerTrade: string;
  recommendedDeposit: string;
}

export interface ForexEAProduct {
  id: string;
  name: string;
  code: string;
  tagline: string;
  category: 'Scalping' | 'Trend Following' | 'Grid / Multi-Pair' | 'Prop Firm';
  platform: PlatformType;
  currencyPairs: string[];
  timeframe: string;
  price: number;
  originalPrice?: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  avgMonthlyReturn: string;
  totalTradesVerified: number;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface BoundAccount {
  accountNumber: string;
  broker: string;
  serverType: 'Live' | 'Demo';
  boundAt: string;
  status: 'Active' | 'Pending Verification';
}

export interface ForexOrderDetails {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerCountry: string;
  createdAt: string;
  licenseKey: string;
  licenseType: 'Lifetime Commercial' | 'Annual Trader' | 'Prop Firm Unlimited';
  maxLiveAccounts: number;
  maxDemoAccounts: number;
  boundAccounts: BoundAccount[];
  product: ForexEAProduct;
  vpsPackage?: {
    enabled: boolean;
    ipAddress: string;
    port: number;
    location: string;
    pingMs: number;
    operatingSystem: string;
    status: 'Running' | 'Rebooting' | 'Standby';
    renewDate: string;
  };
  payment: {
    method: string;
    cardBrand: string;
    last4: string;
    transactionId: string;
    billingCountry: string;
    authorizedAt: string;
  };
  financials: {
    subtotal: number;
    discountAmount: number;
    vpsCharge: number;
    taxAmount: number;
    totalPaid: number;
  };
  presets: ForexEAPreset[];
  vipAccessUrl: string;
}

export interface ForexAddon {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  benefit: string;
  compatibleWith: string;
}
