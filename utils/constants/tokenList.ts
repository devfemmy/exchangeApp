/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */


import { algorand, avalanche, bitcoin, bitcoinCash, dogeCoin, ethereum, litecoin, okb, polygon, ripple, solana, steller, tether, tron, usd } from "../../assets/images";



const tokenBalanceData = [
    {
      icon: tether,
      token: "Tether",
      currency: "usdt",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon: ethereum,
      token: "Ethereum",
      currency: "eth",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: usd,
      token: "USD Coin",
      currency: "usdc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: tron,
      token: "Tron",
      currency: "trx",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: solana,
      token: "Solana",
      currency: "sol",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon: bitcoin,
      token: "Bitcoins",
      currency: "btc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: algorand,
      token: "Algorand",
      currency: "algo",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: ripple,
      token: "Ripple",
      currency: "xrp",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: bitcoinCash,
      token: "Bitcoin Cash",
      currency: "bch",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: polygon,
      token: "Polygon",
      currency: "matic",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: avalanche,
      token: "Avalanche",
      currency: "avax",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon: steller,
      token: "Stellar",
      currency: "xlm",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: litecoin,
      token: "LiteCoin",
      currency: "ltc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: dogeCoin,
      token: "DogeCoin",
      currency: "doge",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: okb,
      token: "OKX",
      currency: "okb",
      pendingBalance: 0,
      availableBalance: 0,
    },
  ];


  
  const tokenNetwork = [
    {
      token: "Tether (USDT)",
      unit: "usdt",
      networks: [
        {
          title: "TRC-20",
          value: "trc-20",
        },
        {
          title: "ERC-20",
          value: "erc-20",
        },
        {
          title: "Polygon (MATIC)",
          value: "matic",
        },
        {
          title: "AVALANCHE C_CHAIN",
          value: "c_chain",
        },
        {
          title: "OKC",
          value: "okc",
        },
      ],
    },
    {
      token: "Ethereum (ETH)",
      unit: "eth",
      networks: [
        {
          title: "ERC-20",
          value: "erc-20",
        },
      ],
    },
    {
      token: "USDC (USDC)",
      unit: "ucdc",
      networks: [
        {
          title: "TRC-20",
          value: "trc-20",
        },
        {
          title: "ERC-20",
          value: "erc-20",
        },
        {
          title: "Polygon (MATIC)",
          value: "matic",
        },
        {
          title: "AVALANCHE C_CHAIN",
          value: "c_chain",
        },
        {
          title: "OKC",
          value: "okc",
        },
      ],
    },
  
    {
      token: "TRON (TRX)",
      unit: "trx",
      networks: [
        {
          title: "TRC-20",
          value: "trc-20",
        },
      ],
    },
  
    {
      token: "Solana (SOL)",
      unit: "sol",
      networks: [
        {
          title: "SOL",
          value: "sol",
        },
      ],
    },
    {
      token: "Bitcoins (BTC)",
      unit: "btc",
      networks: [
        {
          title: "BTC-Bitcoin",
          value: "btc",
        },
      ],
    },
    {
      token: "Ripple (XRP)",
      unit: "xrp",
      networks: [
        {
          title: "XRP-Ripple",
          value: "xrp",
        },
      ],
    },
    {
      token: "Algorand (ALGO)",
      unit: "algo",
      networks: [
        {
          title: "ALGO-Algorand",
          value: "algo",
        },
      ],
    },
    {
      token: "Bitcoin CASH (BCH)",
      unit: "bch",
      networks: [
        {
          title: "BCH-BitcoinCash",
          value: "bch",
        },
      ],
    },
    {
      token: "Polygon (MATIC)",
      unit: "matic",
      networks: [
        {
          title: "ERC-20",
          value: "erc-20",
        },
        {
          title: "Polygon",
          value: "polygon",
        },
      ],
    },
    {
      token: "Avalanche  (AVAX)",
      unit: "avax",
      networks: [
        {
          title: "AVAX-X Chain",
          value: "avax-x",
        },
        {
          title: "AVAX-C chain",
          value: "axax-c",
        },
      ],
    },
    {
      token: "Stellar (XLM)",
      unit: "xlm",
      networks: [
        {
          title: "XLM-Stellar Lumens",
          value: "xlm-stellar",
        },
      ],
    },
    {
      token: "LiteCoin (LTC)",
      unit: "ltc",
      networks: [
        {
          title: "LTC-LiteCoin",
          value: "ltc",
        },
      ],
    },
    {
      token: "DogeCoin (DOGE)",
      unit: "doge",
      networks: [
        {
          title: "DOGE-DogeCoin",
          value: "doge",
        },
      ],
    },
    {
      token: "OKX (OKB)",
      unit: "okb",
      networks: [
        {
          title: "OKB-ERC20",
          value: "okb-erc20",
        },
        {
          title: "OKB-OKC",
          value: "okc",
        },
      ],
    },
  ];

  export { tokenBalanceData, tokenNetwork }