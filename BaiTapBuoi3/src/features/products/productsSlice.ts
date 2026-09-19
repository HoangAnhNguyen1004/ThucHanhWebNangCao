import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';

import type { Product } from '../../types/product';

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

const fakeApi = async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        {
            id: 1,
            title: 'Điện thoại iPhone 15 128GB Pink Pastel',
            price: 19490000,
            image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&auto=format&fit=crop&q=80',
            category: 'phone',
        },
        {
            id: 2,
            title: 'Tai nghe Chụp tai Bluetooth Cute Pink Cat Ear',
            price: 1890000,
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
            category: 'audio',
        },
        {
            id: 3,
            title: 'Bàn phím cơ không dây AKKO Sakura Pink Edition',
            price: 1750000,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
            category: 'accessory',
        },
        {
            id: 4,
            title: 'Chuột không dây Silent Logitech Rose Gold Pink',
            price: 590000,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
            category: 'accessory',
        },
        {
            id: 5,
            title: 'Đồng hồ thông minh Smartwatch Pink Blush Sport Band',
            price: 5290000,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
            category: 'phone',
        },
        {
            id: 6,
            title: 'Loa Bluetooth Mini Retro Pastel Pink Super Bass',
            price: 1250000,
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
            category: 'audio',
        },
    ];
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await fakeApi();
    }
);

const productsSlice = createSlice({
    name: 'products',

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = 'Không thể tải danh sách sản phẩm. Vui lòng kiểm tra lại!';
            });
    },
});

export default productsSlice.reducer;