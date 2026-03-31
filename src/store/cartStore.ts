import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === newItem.id && i.size === newItem.size
        );
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === newItem.id && i.size === newItem.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),

      removeItem: (id, size) => set((state) => ({
        items: state.items.filter((i) => !(i.id === id && i.size === size))
      })),

      updateQuantity: (id, size, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: Math.max(0, quantity) }
            : i
        ).filter(i => i.quantity > 0)
      })),

      clearCart: () => set({ items: [] }),
      
      getTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'aethel-cart-storage',
    }
  )
)
