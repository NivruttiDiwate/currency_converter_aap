import axios from "axios";

const api = axios.create({
  baseURL:
    "https://v6.exchangerate-api.com/v6/78ada1a77260293ff6fbcd06",
});

export const currencyConverter = (fromCurrency, toCurrency, amount) =>{
   return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`)
}
