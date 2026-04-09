import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

interface BasketContextType {
  items: BasketItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: Omit<BasketItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalPrice: number;
  deliveryFee: number;
}

const BasketContext = createContext<BasketContextType | null>(null);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  const restaurantId = items.length > 0 ? items[0].restaurantId : null;
  const restaurantName = items.length > 0 ? items[0].restaurantName : null;

  const addItem = useCallback((item: Omit<BasketItem, 'quantity'>) => {
    setItems((prev) => {
      // If adding from a different restaurant, clear basket first
      if (prev.length > 0 && prev[0].restaurantId !== item.restaurantId) {
        return [{ ...item, quantity: 1 }];
      }
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
    }
  }, []);

  const clearBasket = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const deliveryFee = totalPrice > 15 ? 0 : 1.99;

  return (
    <BasketContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        totalItems,
        totalPrice,
        deliveryFee,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used within BasketProvider');
  return ctx;
}
