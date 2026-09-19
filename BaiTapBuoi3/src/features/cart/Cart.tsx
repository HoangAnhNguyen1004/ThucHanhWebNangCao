import { useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../app/hooks';

import {
    removeFromCart,
    updateQuantity,
} from './cartSlice';

export default function Cart() {
    const dispatch = useAppDispatch();
    const [voucherInput, setVoucherInput] = useState('PINKLOVE');
    const [isVoucherApplied, setIsVoucherApplied] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const items = useAppSelector(
        state => state.cart.items
    );

    const subtotal = items.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Calculate discount if voucher is active
    const discountAmount = isVoucherApplied ? Math.round(subtotal * 0.1) : 0;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    const handleApplyVoucher = (e: React.FormEvent) => {
        e.preventDefault();
        if (voucherInput.trim().toUpperCase() === 'PINKLOVE') {
            setIsVoucherApplied(true);
        } else {
            alert('Mã giảm giá không hợp lệ. Hãy thử mã "PINKLOVE" nhé!');
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) return;
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderSuccess(true);
            setTimeout(() => setOrderSuccess(false), 5000);
        }, 800);
    };

    return (
        <div className="cart-card">
            {/* Cart Header */}
            <div className="cart-card-header">
                <div className="cart-title-wrapper">
                    <span className="cart-header-emoji">🛍️</span>
                    <h2 className="cart-heading">Túi Đồ Xinh</h2>
                </div>
                <span className="cart-counter-pill">
                    {totalQuantity} món
                </span>
            </div>

            {/* Success Alert */}
            {orderSuccess && (
                <div className="checkout-success-alert">
                    <span className="alert-icon">🎉</span>
                    <div>
                        <strong>Đặt hàng thành công! 💖</strong>
                        <p>Cảm ơn bạn! Đơn hàng tone hồng đang được chuẩn bị gói quà xinh xắn.</p>
                    </div>
                </div>
            )}

            {items.length === 0 ? (
                /* Empty Cart State */
                <div className="cart-empty-container">
                    <div className="cart-empty-icon">🌸</div>
                    <p className="cart-empty-title">Giỏ hàng đang trống</p>
                    <p className="cart-empty-desc">
                        Chưa có sản phẩm nào. Hãy chọn những món đồ màu hồng yêu thích và thêm vào giỏ nhé! 💕
                    </p>
                </div>
            ) : (
                <>
                    {/* Cart Items List */}
                    <div className="cart-items-list">
                        {items.map(item => (
                            <div className="cart-item-row" key={item.id}>
                                {item.image && (
                                    <div className="cart-item-thumb">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                )}

                                <div className="cart-item-content">
                                    <h4 className="cart-item-title" title={item.title}>
                                        {item.title}
                                    </h4>

                                    <div className="cart-item-price-unit">
                                        {item.price.toLocaleString('vi-VN')} ₫
                                    </div>

                                    <div className="cart-item-row-actions">
                                        {/* Stepper */}
                                        <div className="quantity-stepper">
                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                title="Giảm"
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        dispatch(
                                                            updateQuantity({
                                                                id: item.id,
                                                                quantity: item.quantity - 1,
                                                            })
                                                        );
                                                    } else {
                                                        dispatch(removeFromCart(item.id));
                                                    }
                                                }}
                                            >
                                                −
                                            </button>

                                            <input
                                                type="number"
                                                className="stepper-input"
                                                min="1"
                                                value={item.quantity}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value, 10);
                                                    if (!isNaN(val) && val >= 1) {
                                                        dispatch(
                                                            updateQuantity({
                                                                id: item.id,
                                                                quantity: val,
                                                            })
                                                        );
                                                    }
                                                }}
                                            />

                                            <button
                                                type="button"
                                                className="stepper-btn"
                                                title="Tăng"
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            id: item.id,
                                                            quantity: item.quantity + 1,
                                                        })
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Delete */}
                                        <button
                                            className="btn-remove-item"
                                            title="Xoá món này"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 6h18" />
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                            </svg>
                                            <span>Xoá</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-total-col">
                                    <span className="cart-item-subtotal">
                                        {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Voucher Box */}
                    <div className="voucher-section">
                        <form onSubmit={handleApplyVoucher} className="voucher-form">
                            <input
                                type="text"
                                className="voucher-input"
                                placeholder="Mã giảm giá..."
                                value={voucherInput}
                                onChange={e => setVoucherInput(e.target.value)}
                            />
                            <button type="submit" className="voucher-btn">
                                Áp dụng
                            </button>
                        </form>
                        {isVoucherApplied && (
                            <span className="voucher-applied-tag">
                                🎀 Đã áp dụng mã PINKLOVE (-10%)
                            </span>
                        )}
                    </div>

                    {/* Summary Footer */}
                    <div className="cart-summary-footer">
                        <div className="summary-row">
                            <span className="summary-label">Tạm tính:</span>
                            <span className="summary-value">
                                {subtotal.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>

                        {isVoucherApplied && (
                            <div className="summary-row discount-row">
                                <span className="summary-label">Giảm giá voucher:</span>
                                <span className="discount-value">
                                    - {discountAmount.toLocaleString('vi-VN')} ₫
                                </span>
                            </div>
                        )}

                        <div className="summary-row">
                            <span className="summary-label">Phí vận chuyển:</span>
                            <span className="shipping-badge">🌸 Miễn phí 0₫</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total-summary-row">
                            <span className="total-title">Tổng thanh toán:</span>
                            <span className="total-amount">
                                {finalTotal.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>

                        <button
                            className="btn btn-checkout"
                            disabled={isCheckingOut || items.length === 0}
                            onClick={handleCheckout}
                        >
                            {isCheckingOut ? (
                                <span className="checkout-loading-text">
                                    <span className="pink-small-spinner"></span> Đang tạo đơn...
                                </span>
                            ) : (
                                <span>💝 Đặt hàng ngay ({totalQuantity})</span>
                            )}
                        </button>

                        <div className="cart-security-note">
                            <span>🎀 Tặng kèm túi vải & quà lưu niệm xinh xắn</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}