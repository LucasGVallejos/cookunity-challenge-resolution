import { FC } from "react";
import cart from '../assets/cart.svg'

interface CartProps {
    amountOfItems: number;
    onClick: () => void;
    buttonText: string
}

export const Cart: FC<CartProps> = ({ amountOfItems, onClick, buttonText }) => (
    <button className="btn-primary cta" data-test-id="subheader-cta" onClick={onClick}>
        <div className="cart-counter">
            <img src={cart} alt="Cart Icon" />
            <span data-test-id="cart-counter">{amountOfItems}</span>
        </div>
        <span className="copy">{buttonText}</span>
    </button>
);