import { useState } from "react";
import { currencyConverter } from "./api/postAPI";
import "./App.css"

const App = () => {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [ConvertAmount, setConvertAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headleConverCurrecy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      const { conversion_result } = await res.data;
      setConvertAmount(conversion_result);
    } catch (error) {
      setError("Error fetching conversion rate");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section>
      <div className="contact-box">
        <h1>Currncy Converter</h1>
        <div className="input-box">
          <label htmlFor="currncy_amount">Amount</label>
          <input
            type="number"
            id="currncy_amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="input=box">
          <label> From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="select-input"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
            <option value="AUD-">AUD</option>
          </select>
        </div>
        <div className="input=box">
          <label> To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="select-input"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AUD-">AUD</option>
          </select>
        </div>
        <button disabled={loading || amount <= 0} onClick={headleConverCurrecy}>
          {loading ? "Converting..." : "Convert"}
        </button>

        <hr />
        {ConvertAmount && (
          <div className="">
            <h2>
              {amount} {fromCurrency} = {ConvertAmount.toFixed(2)}
              {toCurrency}
            </h2>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </section>
  );
};
export default App;
