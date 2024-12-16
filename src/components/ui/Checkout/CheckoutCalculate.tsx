import { CheckoutCalculate } from '../../../types/ResponceTypes';

export default function CheckoutCalculated({
  checkoutCalculate,
}: {
  checkoutCalculate: CheckoutCalculate;
}) {
  const {
    subTotal,
    shipping,
    discount,
    coinsRedeemed,
    membershipDiscount,
    coupon,
    total,
  } = checkoutCalculate;
  return (
    <div className="flex flex-col gap-4 m-6">
      <p className="body1">Varsada Bag Summary</p>

      <div className="flex justify-between">
        <p className="body2">Subtotal</p>
        <p className="body2 text-gray-400">${subTotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="body2">Shipping</p>
        <p className="body2 text-gray-400">${shipping.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="body2">Discount</p>
        <p className="body2 text-red-400">-${discount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="body2">Coins Redeemed</p>
        <p className="body2 text-red-400">-${coinsRedeemed.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="body2">Membership Discount</p>
        <p className="body2 text-red-400">-${membershipDiscount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="body2">Coupon</p>
        <p className="body2 text-red-400">-${coupon.toFixed(2)}</p>
      </div>
      <div className="flex justify-between mt-4">
        <p className="body2 font-bold">Total</p>
        <p className="body2 font-bold">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
