export interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Bakery & Pantry' | 'Beverages & Snacks' | 'Household';
  quantity: number;
  unit: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  notes?: string;
  isQuickAdd?: boolean;
}

export type OrderStatus = 'received' | 'picking' | 'quality_check' | 'out_for_delivery' | 'delivered';

export interface OrderDetails {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  estimatedDeliveryWindow: string;
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    instructions: string;
  };
  fulfillmentType: 'delivery' | 'pickup';
  pickupStore: {
    name: string;
    address: string;
    pickupLane: string;
    operatingHours: string;
  };
  status: OrderStatus;
  shopper: {
    name: string;
    role: string;
    rating: number;
    completedOrders: number;
    avatarUrl?: string;
    currentTask: string;
  };
  payment: {
    method: string;
    last4: string;
    cardBrand: string;
    authorizedAt: string;
    transactionId: string;
  };
  loyalty: {
    pointsEarned: number;
    previousBalance: number;
    totalBalance: number;
    nextTierTarget: number;
    tierName: string;
  };
  items: GroceryItem[];
  savings: number;
  bagFee: number;
  deliveryFee: number;
  taxRate: number;
}
