import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemPage from './pages/products/ProductsList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BillsPage from './pages/orders/OrdersPage';
import PosLayout from './partials/PosLayout';
import RequireAuth from './components/RequireAuth';
import MediaUpload from './pages/media/MediaUpload';
import CustomersController from './pages/customers/CustomersController';
import Pos from './pages/pos/Pos';
import SettingsPage from './pages/settings/SettingsPage';
import settingsStore from './stores/settingsStore';
import Spinner from './components/Spinner';

const App = () => {

	const [loading, setLoading] = useState(false);

	// Load settings from localStorage on component mount
	useEffect(() => {
		const fetchSettings = async () => {
			await settingsStore.fetchSettings();
			setLoading(true);
		};

		fetchSettings();
	}, []);

	return (
		<BrowserRouter>
			{
				loading ?
					(<Routes>
						<Route path="/" element={<PosLayout />}>
							<Route
								path="/"
								element={
									<RequireAuth>
										<Pos />
									</RequireAuth>
								}
							/>
							<Route
								path="/items"
								element={
									<RequireAuth>
										<ItemPage />
									</RequireAuth>
								}
							/>
							<Route
								path="/orders"
								element={
									<RequireAuth>
										<BillsPage />
									</RequireAuth>
								}
							/>
							<Route
								path="/customers"
								element={
									<RequireAuth>
										<CustomersController />
									</RequireAuth>
								}
							/>
							<Route
								path="/media"
								element={
									<RequireAuth>
										<MediaUpload />
									</RequireAuth>
								}
							/>
							<Route
								path="/settings"
								element={
									<RequireAuth>
										<SettingsPage />
									</RequireAuth>
								}
							/>
						</Route>

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>)
					: (<Spinner />)
			}
		</BrowserRouter>
	);
};

export default App;
