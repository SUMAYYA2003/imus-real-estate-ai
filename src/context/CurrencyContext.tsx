'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'AED' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (aedAmount: number) => string;
  formatRate: (aedPerSqft: number) => string;
  currencySymbol: string;
}

const AED_TO_USD = 1 / 3.6725;

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('AED');

  const formatPrice = (aedAmount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(aedAmount * AED_TO_USD);
      return `$ ${usd.toLocaleString('en-US')}`;
    }
    return `AED ${aedAmount.toLocaleString('en-US')}`;
  };

  const formatRate = (aedPerSqft: number) => {
    if (currency === 'USD') {
      const usdPerSqft = Math.round(aedPerSqft * AED_TO_USD);
      return `$ ${usdPerSqft.toLocaleString('en-US')}/sqft`;
    }
    return `AED ${aedPerSqft.toLocaleString('en-US')}/sqft`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        formatRate,
        currencySymbol: currency === 'USD' ? '$' : 'AED',
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
