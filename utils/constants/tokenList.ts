/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */


import { algorand, avalanche, bitcoin, bitcoinCash, dogeCoin, ethereum, litecoin, okb, polygon, ripple, solana, steller, tether, tron, usd } from "../../assets/images";



const tokenBalanceData = [
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809875/qba6vnzvpezwugypvs97.png",
      token: "Tether",
      currency: "usdt",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809867/x0nw7s4vxdubiefgxi6a.png",
      token: "Ethereum",
      currency: "eth",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809877/bc81wrgmaxzyxptie2er.png",
      token: "USD Coin",
      currency: "usdc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809876/wbgxrfexxb4uegfqkwdo.png",
      token: "Tron",
      currency: "trx",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809874/dlomjcpebmtr1txv2rog.png",
      token: "Solana",
      currency: "sol",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809865/e1tgyepzknaarvtbca9u.png",
      token: "Bitcoins",
      currency: "btc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809863/wp8ndsswutgyskbvgddj.png",
      token: "Algorand",
      currency: "algo",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809872/edbzaww78if7l6rv6hos.png",
      token: "Ripple",
      currency: "xrp",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809867/dxnl14b5yipngxxpidld.png",
      token: "Bitcoin Cash",
      currency: "bch",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon:  "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809872/lsgzo7vc913j7dxkfwnt.png",
      token: "Polygon",
      currency: "matic",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809866/fjbrxegrtwvyrou8pj4g.png",
      token: "Avalanche",
      currency: "avax",
      pendingBalance: 0,
      availableBalance: 0,
      fall: true
    },
    {
      icon:"https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809874/lirttnw92kxmbgd0iuib.png",
      token: "Stellar",
      currency: "xlm",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809869/hpjyjmry4t8tlgip0dkk.png",
      token: "LiteCoin",
      currency: "ltc",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809872/dwq2gn0rukb7tjiwhsjy.png",
      token: "DogeCoin",
      currency: "doge",
      pendingBalance: 0,
      availableBalance: 0,
    },
    {
      icon: "https://res.cloudinary.com/dtbjhs8a6/image/upload/v1682809870/zezvdlkcurime4yxgyog.png",
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