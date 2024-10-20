export const formatPrice = (price: string, currency: string = "EGP") => {
    return new Intl.NumberFormat("en-US").format(Number(price)) + ` ${currency}`;
  };
