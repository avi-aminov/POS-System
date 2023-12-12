// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// partials component
import PosLayout from './partials/PosLayout';

// global component
import RequireAuth from './components/RequireAuth';

// pages components
import Pos from './pages/pos/Pos';
import ItemPage from './pages/products/ProductsList';
import BillsPage from './pages/orders/OrdersPage';
import CustomersController from './pages/customers/CustomersController';
import ImageUploader from './pages/media/ImageUploader';
import SettingsPage from './pages/settings/SettingsPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductsList from './pages/products/ProductsList';
import CategoriesList from './pages/categories/CategoriesList';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PosLayout />}>
					<Route path="/" element={
						<RequireAuth>
							<Pos />
						</RequireAuth>
					} />
					<Route path="/items" element={
						<RequireAuth>
							<ItemPage />
						</RequireAuth>
					} />
					<Route path="/orders" element={
						<RequireAuth>
							<BillsPage />
						</RequireAuth>
					} />
					<Route path="/products" element={
						<RequireAuth>
							<ProductsList />
						</RequireAuth>
					} />
					<Route path="/categories" element={
						<RequireAuth>
							<CategoriesList />
						</RequireAuth>
					} />
					<Route path="/customers" element={
						<RequireAuth>
							<CustomersController />
						</RequireAuth>
					} />
					<Route path="/media" element={
						<RequireAuth>
							<ImageUploader />
						</RequireAuth>
					} />
					<Route path="/settings" element={
						<RequireAuth>
							<SettingsPage />
						</RequireAuth>
					} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
