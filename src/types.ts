export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classic' | 'premium' | 'side' | 'drink';
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  cartId: string;
  quantity: number;
  customizations?: {
    crust: CustomizationOption;
    sauce: CustomizationOption;
    toppings: CustomizationOption[];
  };
  totalPrice: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}
