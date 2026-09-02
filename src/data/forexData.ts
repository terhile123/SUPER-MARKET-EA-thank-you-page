import { ForexEAProduct, ForexOrderDetails, ForexAddon } from '../types';

export const availableForexEAs: ForexEAProduct[] = [
  {
    id: 'ea-apex-gold',
    name: 'Apex Gold Scalper EA Pro',
    code: 'AGS-XAU',
    tagline: 'High-precision algorithmic scalper engineered specifically for XAUUSD liquidity cycles.',
    category: 'Scalping',
    platform: 'Both',
    currencyPairs: ['XAUUSD (Gold)'],
    timeframe: 'M15 / M30',
    price: 349,
    originalPrice: 499,
    winRate: 78.4,
    profitFactor: 2.38,
    maxDrawdown: 4.8,
    avgMonthlyReturn: '+11.5% to +18.2%',
    totalTradesVerified: 1840,
    description:
      'Engineered with proprietary volatility break-out algorithms, dynamic ATR trailing stops, and zero-martingale risk management. Fully compatible with FTMO, FundedNext, and personal ECN raw spread brokers.',
    features: [
      'Zero Martingale / Zero Grid Risk',
      'Dynamic Hard Stop Loss on every order',
      'Prop-Firm Drawdown Hard Cap (4.5% limit)',
      'Built-in High Impact News Filter (NFP / FOMC)',
      'Compatible with MT4 & MT5 Terminals',
      'Low Spread Execution Engine with Slippage Filter'
    ],
    isFeatured: true,
  },
  {
    id: 'ea-quantum-trend',
    name: 'Quantum TrendMaster AI EA',
    code: 'QTM-FX',
    tagline: 'Multi-pair institutional trend-following robot with order-flow imbalance detection.',
    category: 'Trend Following',
    platform: 'Both',
    currencyPairs: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'],
    timeframe: 'H1 / H4',
    price: 289,
    originalPrice: 399,
    winRate: 72.1,
    profitFactor: 2.15,
    maxDrawdown: 5.6,
    avgMonthlyReturn: '+8.4% to +14.1%',
    totalTradesVerified: 2450,
    description:
      'Rides sustained institutional macro trends while automatically pruning stalled positions. Employs machine-learning trained swing points to maximize risk-to-reward ratios (1:3+ avg).',
    features: [
      'Multi-currency simultaneous portfolio trading',
      'Adaptive Break-Even & Tiered Partial Take-Profit',
      'ECN Raw Spread optimizer',
      'Weekend position auto-close safety mode',
      'Smart lot calculator based on account balance %'
    ],
  },
  {
    id: 'ea-propfirm-pass',
    name: 'NeuroFX PropFirm Pass EA',
    code: 'NPP-AI',
    tagline: 'Strict risk-governed automated EA designed to pass Phase 1 & 2 funded challenges.',
    category: 'Prop Firm',
    platform: 'Both',
    currencyPairs: ['EURUSD', 'GBPUSD', 'USDCAD', 'XAUUSD'],
    timeframe: 'M15',
    price: 399,
    originalPrice: 550,
    winRate: 81.2,
    profitFactor: 2.64,
    maxDrawdown: 3.2,
    avgMonthlyReturn: '+9.8% to +15.5%',
    totalTradesVerified: 1290,
    description:
      'Tailored with hard stop limits that make it mathematically impossible to breach daily 5% or total 10% prop firm drawdown rules. Over 840 verified prop accounts passed.',
    features: [
      'Hard daily 3.8% loss lock (Never violates daily 5% rule)',
      'Trailing profit lock algorithm',
      'Compliant with FTMO, The Funded Trader, FundedNext',
      'Custom prop firm preset files (.set) pre-configured',
      'Instant emergency close-all panic button'
    ],
    isFeatured: true,
  },
  {
    id: 'ea-multi-grid',
    name: 'Aegis Hedged Grid Pro EA',
    code: 'AHG-PRO',
    tagline: 'Defensive mean-reverting currency engine with correlated hedge protection.',
    category: 'Grid / Multi-Pair',
    platform: 'Both',
    currencyPairs: ['EURGBP', 'AUDCAD', 'NZDCAD'],
    timeframe: 'M15 / H1',
    price: 249,
    originalPrice: 350,
    winRate: 84.6,
    profitFactor: 1.95,
    maxDrawdown: 8.9,
    avgMonthlyReturn: '+6.5% to +11.0%',
    totalTradesVerified: 3100,
    description:
      'Trades ranging non-trending currency pairs with basket hedge exits. Ideal for steady cash flow generation on private accounts.',
    features: [
      'Correlation-based hedge entry system',
      'Virtual stop loss undetectable by broker dealers',
      'Low swap currency pair prioritization',
      'Max open trades limiter',
      'Time filter to avoid illiquid Asian session rollover'
    ],
  }
];

export const initialForexOrder: ForexOrderDetails = {
  orderId: 'ord_fea_984129',
  orderNumber: 'FEA-94021',
  customerName: 'Valued Client',
  customerEmail: 'trader@algofx.io',
  customerCountry: 'United Kingdom',
  createdAt: 'September 02, 2026 • 16:14 GMT',
  licenseKey: 'EA-XAU-9924-BETA-7841',
  licenseType: 'Lifetime Commercial',
  maxLiveAccounts: 2,
  maxDemoAccounts: 5,
  boundAccounts: [
    {
      accountNumber: '8492019',
      broker: 'IC Markets (SC) - Live 04',
      serverType: 'Live',
      boundAt: 'September 02, 2026 • 16:16 GMT',
      status: 'Active'
    }
  ],
  product: availableForexEAs[0],
  vpsPackage: {
    enabled: true,
    ipAddress: '185.244.192.44',
    port: 3389,
    location: 'Equinix LD4, London (UK)',
    pingMs: 1.2,
    operatingSystem: 'Windows Server 2022 Datacenter (MetaTrader Optimized)',
    status: 'Running',
    renewDate: 'October 02, 2026 (Free Month Included)',
  },
  payment: {
    method: 'Credit Card / Visa',
    cardBrand: 'Visa Signature',
    last4: '4242',
    transactionId: 'TXN-STRIPE-891048204-EA',
    billingCountry: 'United Kingdom',
    authorizedAt: '16:14:22 GMT',
  },
  financials: {
    subtotal: 499.00,
    discountAmount: 150.00,
    vpsCharge: 0.00, // 1st month free promo
    taxAmount: 0.00, // Software export zero-rated
    totalPaid: 349.00,
  },
  presets: [
    {
      id: 'pr-1',
      name: 'Conservative Prop-Firm 0.5%',
      filename: 'Apex_XAUUSD_Conservative_PropFirm.set',
      description: 'Strict 0.5% max risk per position. Engineered to comply with FTMO and prop firm challenges.',
      targetRiskPerTrade: '0.50% Equity',
      recommendedDeposit: '$5,000+',
    },
    {
      id: 'pr-2',
      name: 'Balanced Alpha 1.5%',
      filename: 'Apex_XAUUSD_Balanced_Growth.set',
      description: 'Standard institutional risk for compound account growth with dynamic breakeven.',
      targetRiskPerTrade: '1.50% Equity',
      recommendedDeposit: '$2,000+',
    },
    {
      id: 'pr-3',
      name: 'High Performance Scalp 2.5%',
      filename: 'Apex_XAUUSD_HighAlpha_Aggressive.set',
      description: 'Maximum trade frequency with tight 12-pip trailing stops on 15-minute Gold charts.',
      targetRiskPerTrade: '2.50% Equity',
      recommendedDeposit: '$1,000+',
    }
  ],
  vipAccessUrl: 'https://t.me/+AlgoFX_VIP_Institutional_Desk',
};

export const forexAddons: ForexAddon[] = [
  {
    id: 'addon-news-filter',
    title: 'Institutional News Guardian EA Addon',
    category: 'Safety & Risk',
    price: 39,
    originalPrice: 79,
    description: 'Auto-fetches ForexFactory / Bloomberg calendars directly into MT4/MT5. Pauses trading 15m before & after red-folder events.',
    benefit: 'Protects from unpredictable 100-pip news slippage on CPI / NFP.',
    compatibleWith: 'All MT4 / MT5 EAs',
  },
  {
    id: 'addon-vps-year',
    title: 'Ultra Low-Latency Equinix VPS (1-Year Pass)',
    category: 'Infrastructure',
    price: 89,
    originalPrice: 150,
    description: 'Co-located directly next to IC Markets, Pepperstone, and FTMO trade servers. Guaranteed 0.8ms - 1.4ms latency.',
    benefit: 'Prevents slippage and keeps EA running 24/5 with 99.99% uptime.',
    compatibleWith: 'Windows / Mac / Mobile RDP',
  },
  {
    id: 'addon-extra-accounts',
    title: 'Extra Account Binding Pack (+3 Live Accounts)',
    category: 'Licensing',
    price: 49,
    originalPrice: 99,
    description: 'Expand your lifetime license to attach the EA on 3 additional live broker accounts simultaneously.',
    benefit: 'Trade multiple broker accounts and prop challenges under one license.',
    compatibleWith: 'Apex Gold Scalper Pro',
  },
  {
    id: 'addon-vip-desk',
    title: 'VIP Discord / Telegram Quant Strategy Desk (Lifetime)',
    category: 'Community',
    price: 29,
    originalPrice: 69,
    description: 'Direct daily access to our quantitative algorithmic developers, weekly optimized .set presets, and macro news briefings.',
    benefit: 'Get real-time market regime adjustments for optimal EA performance.',
    compatibleWith: 'All Registered Traders',
  }
];

export const liveForexTickers = [
  { pair: 'XAU/USD', price: '2,894.40', change: '+1.42%', up: true },
  { pair: 'EUR/USD', price: '1.0845', change: '+0.18%', up: true },
  { pair: 'GBP/USD', price: '1.2982', change: '-0.24%', up: false },
  { pair: 'USD/JPY', price: '151.65', change: '+0.35%', up: true },
  { pair: 'USD/CAD', price: '1.3540', change: '-0.12%', up: false },
  { pair: 'AUD/USD', price: '0.6620', change: '+0.45%', up: true },
];

export const forexFaqs = [
  {
    q: 'Where do I find my bot access files, download links, and license key?',
    a: 'An automated bot access dispatch is delivered to your registered email inbox immediately upon checkout. It contains direct download links for your .ex4 (MT4) & .ex5 (MT5) files, your unique master license activation token, and your dedicated VPS login credentials. If you do not see it within 2 minutes, check your Spam/Junk folder or click "Resend Access Email" in your hub.'
  },
  {
    q: 'How do I install the EA (.ex4 / .ex5) into MetaTrader 4 or 5?',
    a: 'Open your MetaTrader terminal, click File -> Open Data Folder. Open the MQL4 (or MQL5) folder, then open Experts. Paste the downloaded .ex4 or .ex5 file there. Restart MetaTrader, enable "Allow Automated Trading", and drag the EA onto your chart.'
  },
  {
    q: 'Is this EA compliant with Prop Firm challenges (FTMO, FundedNext)?',
    a: 'Yes! Apex Gold Scalper and NeuroFX PropFirm Pass have strict hard-coded daily stop losses and zero martingale/grid logic, keeping you well within the 5% daily drawdown and 10% maximum drawdown limits.'
  },
  {
    q: 'Can I change or rebind my Live Account numbers later?',
    a: 'Yes. Your license allows 2 active live accounts and 5 demo accounts at any time. You can unbind an old account and bind a new account number directly in your License Hub at zero fee.'
  },
  {
    q: 'Do I need a VPS to run the EA?',
    a: 'A VPS (Virtual Private Server) ensures your EA runs 24 hours a day during market hours without needing to keep your computer turned on. Your order comes with 1 month of complimentary Equinix London VPS hosting pre-configured!'
  },
  {
    q: 'What broker and spread conditions are best?',
    a: 'We recommend any ECN or Raw Spread broker with tight spreads (0 to 1 pip on EURUSD and under 15 cents on Gold), such as IC Markets, Pepperstone, Tickmill, or Vantage FX.'
  }
];
