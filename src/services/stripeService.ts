import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_key';
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};

export interface SubscriptionTier {
  id: 'plus' | 'gold' | 'platinum' | 'select';
  name: string;
  price: number;
  priceId: string; // Stripe Price ID
  features: string[];
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'plus',
    name: 'Plus',
    price: 14.99,
    priceId: 'price_plus_monthly',
    features: [
      'Me gusta ilimitados',
      '5 Super Likes al día',
      '1 Boost al mes',
      'Retroceder (Rebobinar)',
      'Pasaporte: cambia ubicación',
      'Sin anuncios',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 29.99,
    priceId: 'price_gold_monthly',
    features: [
      'Todo lo de Plus',
      'Ve quién te gustó',
      '10 Super Likes al día',
      '5 Boosts al mes',
      'Top Picks diarios',
      'Ajustes de perfil avanzados',
      'Leer recibos',
      'Prioridad en likes',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 49.99,
    priceId: 'price_platinum_monthly',
    features: [
      'Todo lo de Gold',
      'Me gusta prioritarios',
      'Mensaje antes del match',
      'Super Likes ilimitados',
      'Boosts ilimitados',
      'Acceso a eventos exclusivos',
      'Soporte prioritario 24/7',
      'Perfiles de vídeo',
      'Notas de voz',
    ],
  },
  {
    id: 'select',
    name: 'SELECT™',
    price: 99.99,
    priceId: 'price_select_monthly',
    features: [
      'Todo lo de Platinum',
      'Acceso exclusivo al 1% top',
      'Mensajes directos sin match',
      'Perfil verificado SELECT',
      'Eventos VIP privados',
      'Casamentero personal',
      'Acceso anticipado a nuevas funciones',
      'Juegos rompehielos premium',
      'Modo incógnito avanzado',
      'Análisis de perfil',
    ],
  },
];

export const stripeService = {
  // Create a checkout session
  async createCheckoutSession(tierId: 'plus' | 'gold' | 'platinum' | 'select', userId: string) {
    const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier) throw new Error('Invalid tier');

    // In production, this would call your backend API to create a checkout session
    // Backend would return a session ID or URL
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tierId: tier.id,
        priceId: tier.priceId,
        userId,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      }),
    });

    if (!response.ok) throw new Error('Failed to create checkout session');
    
    const { url } = await response.json();
    
    // Redirect to Stripe Checkout URL
    window.location.href = url;
  },

  // Create a payment intent for consumables
  async createPaymentIntent(amount: number, currency: string = 'usd') {
    // In production, this would call your backend API
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not initialized');

    // Simulate payment
    return {
      clientSecret: 'pi_test_secret',
      amount,
      currency,
    };
  },

  // Confirm payment for consumables
  async confirmPayment(clientSecret: string) {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not initialized');

    // In production, this would confirm the payment
    return { success: true };
  },

  // Get subscription status
  async getSubscriptionStatus(userId: string) {
    // In production, this would call your backend API
    return {
      tier: 'free' as const,
      status: 'active' as const,
      currentPeriodEnd: null,
    };
  },

  // Cancel subscription
  async cancelSubscription(userId: string) {
    // In production, this would call your backend API
    return { success: true };
  },

  // Update subscription (upgrade/downgrade)
  async updateSubscription(userId: string, newTierId: 'plus' | 'gold' | 'platinum' | 'select') {
    // In production, this would call your backend API
    return { success: true, newTier: newTierId };
  },

  // Get billing portal URL
  async getBillingPortalUrl(userId: string) {
    // In production, this would call your backend API
    return `${window.location.origin}/billing`;
  },

  // Purchase consumable item
  async purchaseConsumable(itemId: string, quantity: number = 1) {
    // In production, this would call your backend API
    const prices: Record<string, number> = {
      'boost': 4.99,
      'super-boost': 9.99,
      'super-like': 1.99,
      'first-impression': 2.99,
    };

    const price = prices[itemId];
    if (!price) throw new Error('Invalid item');

    return {
      amount: price * quantity,
      currency: 'usd',
      success: true,
    };
  },
};
