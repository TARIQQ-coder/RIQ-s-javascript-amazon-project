export function getDeliveryOption(cartDeliveryOption){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(cartDeliveryOption === option.id){
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export const deliveryOptions= [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]