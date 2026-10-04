import { useState } from 'react';
import useFavoritesStore, {
  type Product,
} from './store/favoritesStore';
import './App.css';

const products: Product[] = [
  {
    id: 1,
    name: 'Áo thun nam',
    price: 150000,
  },
  {
    id: 2,
    name: 'Quần jean',
    price: 350000,
  },
  {
    id: 3,
    name: 'Giày thể thao',
    price: 800000,
  },
  {
    id: 4,
    name: 'Áo hoodie',
    price: 450000,
  },
];

function App() {
  const [showFavorites, setShowFavorites] =
    useState<boolean>(false);

  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );

  const productsToShow = showFavorites
    ? favorites
    : products;

  return (
    <div className="container">
      <h1>Quản lý sản phẩm</h1>

      <div className="menu">
        <button
          onClick={() => setShowFavorites(false)}
        >
          Tất cả sản phẩm
        </button>

        <button
          onClick={() => setShowFavorites(true)}
        >
          ❤️ Yêu thích ({favorites.length})
        </button>
      </div>

      <div className="product-list">
        {productsToShow.map((product) => {
          const isFavorite = favorites.some(
            (item) => item.id === product.id
          );

          return (
            <div
              className="product"
              key={product.id}
            >
              <div>
                <h2>{product.name}</h2>

                <p>
                  {product.price.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>

              <button
                onClick={() => {
                  if (isFavorite) {
                    removeFavorite(product.id);
                  } else {
                    toggleFavorite(product);
                  }
                }}
              >
                {isFavorite
                  ? '❤️ Đã thích'
                  : '🤍 Yêu thích'}
              </button>
            </div>
          );
        })}
      </div>

      {showFavorites && favorites.length === 0 && (
        <p className="empty">
          Chưa có sản phẩm yêu thích.
        </p>
      )}
    </div>
  );
}

export default App;