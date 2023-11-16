import React, {useState, useId, useEffect} from 'react'
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import useCurrencyInfo from './hooks/useCurrencyInfo';
function CurrencyBox(
  {
    level, 
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency,
    amountDisable = false,
    currencyDisable = false,
  }){

    const amountInputId = useId();
    return(
     <div className='flex m-2 currencyBox'>
        <div className='currencyBox-inner'>
          <label htmlFor={amountInputId}>{level}</label>
          <input 
          id={amountInputId}
          className='text-black px-1'
          type="number"
          name="amount" 
          placeholder='amount'
          disabled={amountDisable}
          value={amount}
          onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))}
          />
        </div>
        <div className='currencyBox-inner right'>
            <div className='flex justify-end'>
              <div>
              <label htmlFor={amountInputId}>Currency Type</label>
              <div className='flex justify-end' id={amountInputId}>
                <select
                className='currency'
                name="currency"
                onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
                value={selectedCurrency}
                disabled={currencyDisable}
                >
                 {/* remember the key in loop */}
                 {currencyOptions.map((currency) => (
                    <option className='bg-slate-600 option' key={currency}>{currency}</option>
                 ))}
                </select>
              </div>
            </div>
              </div>
        </div>
     </div>
    )
}
import './CurrencyConvertor.css'
function CurrencyConvertor() {
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  const currencyInfo = useCurrencyInfo(from);

  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyOptions = Object.keys(currencyInfo);
 
  const swap = ()=>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }
  



  return (
    <div className='flex items-center justify-center h-screen main-container border-s-slate-500 p-10'>
        <div className= 'bg-slate-500 px-8 py-8 inner-container'>
            <CurrencyBox 
            level="From"
            amount={amount}
            selectedCurrency={from}
            currencyOptions={currencyOptions}
            onAmountChange={(amount)=>setAmount(amount)}
            onCurrencyChange={(currency)=>setFrom(currency)}
            />
            <div className='flex justify-center p-0'>
                <button className='swap p-0' onClick={swap}><MdOutlineSwapVerticalCircle className='icon bg-slate-500'/></button>
            </div>
            <CurrencyBox 
            level="To" 
            amount={convertedAmount} 
            selectedCurrency={to} 
            currencyOptions={currencyOptions}
            onAmountChange={(amount)=>setConvertedAmount(amount)}
            onCurrencyChange={(currency)=>setTo(currency)}
            />
            <div className='flex justify-center p-2'>
              <button 
              onClick={()=>setConvertedAmount( amount * currencyInfo[to])}
              className='bg-slate-600 border border-solid border-white px-10 py-1 rounded'>
              Convert {from} to {to}
              </button>
            </div>
        </div>
    </div>
  )
}

export default CurrencyConvertor