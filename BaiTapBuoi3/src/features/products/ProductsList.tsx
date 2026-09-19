import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
    fetchProducts,
} from './productsSlice';

import {
    addToCart,
} from '../cart/cartSlice';

type CategoryFilter = 'all' | 'phone' | 'audio' | 'accessory';

export default function ProductsList() {
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

    const {
        items,
        loading,
        error,
    } = useAppSelector(
        state => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredItems = selectedCategory === 'all'
        ? items
        : items.filter(item => item.category === selectedCategory);

    if (loading) {
        return (
            <div className="products-loading-container">
                <div className="pink-spinner"></div>
                <p className="loading-text">Đang tải bộ sưu tập màu hồng xinh xắn...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-error-container">
                <div className="error-icon">😿</div>
                <p className="error-text">{error}</p>
                <button
                    className="btn btn-pink-retry"
                    onClick={() => dispatch(fetchProducts())}
                >
                    Thử tải lại
                </button>
            </div>
        );
    }

    return (
        <div className="products-section-container">
            {/* Header & Filter Tabs */}
            <div className="products-filter-header">
                <div className="filter-title-wrap">
                    <h2 className="section-heading">
                        <span className="heading-icon">🌸</span> Danh Sách Sản Phẩm
                    </h2>
                    <span className="badge badge-pink-count">
                        {filteredItems.length} sản phẩm
                    </span>
                </div>

                {/* Category Pills */}
                <div className="category-pills">
                    <button
                        className={`pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        ✨ Tất cả
                    </button>
                    <button
                        className={`pill-btn ${selectedCategory === 'phone' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('phone')}
                    >
                        📱 Điện thoại & Watch
                    </button>
                    <button
                        className={`pill-btn ${selectedCategory === 'audio' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('audio')}
                    >
                        🎧 Âm thanh & Tai nghe
                    </button>
                    <button
                        className={`pill-btn ${selectedCategory === 'accessory' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('accessory')}
                    >
                        ⌨️ Phím & Chuột
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {filteredItems.map(product => (
                    <div className="product-card" key={product.id}>
                        <div className="product-image-wrapper">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                                loading="lazy"
                            />
                            <span className="product-tag-badge">
                                🎀 Pastel Tone
                            </span>
                        </div>

                        <div className="product-card-body">
                            <h3 className="product-title" title={product.title}>
                                {product.title}
                            </h3>

                            <div className="product-price-wrapper">
                                <span className="price-label">Giá ưu đãi:</span>
                                <span className="product-price">
                                    {product.price.toLocaleString('vi-VN')} ₫
                                </span>
                            </div>

                            <button
                                className="btn btn-add-cart"
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <span className="cart-btn-icon">💖</span>
                                <span>Thêm vào giỏ</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}