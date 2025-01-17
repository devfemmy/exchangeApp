const assetsData: {
    token: string;
    market_price: string;
    price_change: string;
    balance: string;
    usd: string;
    img: string;
    status: "profit" | "loss";
    id: string;
  }[] = [
    {
      token: "Tether (USDT)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 USDT",
      usd: "$201.1",
      img: "/tether.png",
      id: "usdt",
      status: "profit",
    },
    {
      token: "Ethereum (ETH)",
      market_price: "$1,343.34",
      price_change: "$1.00(0.5%)",
      balance: "201 ETH",
      usd: "$201.1",
      img: "/ethereum.png",
      id: "eth",
      status: "loss",
    },
    {
      token: "USDC (USDC)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "20 USDC",
      usd: "$201.1",
      img: "/usdc.png",
      id: "usdc",
      status: "profit",
    },
    {
      token: "TRON (TRX)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 TRX",
      usd: "$201.1",
      img: "/tron.png",
      id: "trx",
      status: "loss",
    },
    {
      token: "Solana (SOL)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 SOL",
      usd: "$201.1",
      img: "/solana.png",
      id: "sol",
      status: "profit",
    },
    {
      token: "Bitcoins (BTC))",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 BTC",
      usd: "$201.1",
      img: "/bitcoin.png",
      id: "btc",
      status: "profit",
    },
    {
      token: "Ripple (XRP)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 XRP",
      usd: "$201.1",
      img: "/ripple.png",
      id: "xrp",
      status: "loss",
    },
    {
      token: "Algorand (ALGO)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 ALG",
      usd: "$201.1",
      img: "/algorand.png",
      id: "algo",
      status: "profit",
    },
    {
      token: "Bitcoin CASH (BCH)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 BCH",
      usd: "$201.1",
      img: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=023",
      id: "bch",
      status: "profit",
    },
    {
      token: "Polygon (MATIC)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 MATIC",
      usd: "$201.1",
      img: "/polygon.png",
      id: "matic",
      status: "loss",
    },
    {
      token: "Avalanche  (AVAX)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 AVAX",
      usd: "$201.1",
      img: "/avalanche.png",
      id: "avax",
      status: "profit",
    },
    {
      token: "Stellar (XLM)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 XLM",
      usd: "$201.1",
      img: "/stellar.png",
      id: "xlm",
      status: "loss",
    },
    {
      token: "LiteCoin (LTC)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 LTC",
      usd: "$201.1",
      img: "/litecoin.png",
      id: "ltc",
      status: "loss",
    },
    {
      token: "DogeCoin (DOGE)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 DOGE",
      usd: "$201.1",
      img: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=023",
      id: "doge",
      status: "profit",
    },
    {
      token: "OKX (OKB)",
      market_price: "$0.0033",
      price_change: "$1.00(0.5%)",
      balance: "201 OKB",
      usd: "$201.1",
      img: "/okb.png",
      id: "okb",
      status: "profit",
    },
  ];
  
  export default assetsData;
  