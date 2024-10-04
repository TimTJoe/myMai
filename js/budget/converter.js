const url = "https://crypto-market-prices.p.rapidapi.com/tokens?base=USDT";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8a09b9ce14mshe7e1b1858779789p11823djsn69b018bd28ce",
    "X-RapidAPI-Host": "crypto-market-prices.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

export const covertMoney = async (amount, from, to) => {
const url =
  `https://crypto-market-prices.p.rapidapi.com/currencies/convert?from=${from}&to=${to}&amount=${amount}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8a09b9ce14mshe7e1b1858779789p11823djsn69b018bd28ce",
    "X-RapidAPI-Host": "crypto-market-prices.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
};
