import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Homepage from './pages/homepage/Homepage';
import ItemPage from './pages/ItemPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BillsPage from './pages/BillsPage';
//import CutomerPage from './pages/CutomerPage';
import PosLayout from './partials/PosLayout';
import RequireAuth from './components/RequireAuth';
import MediaUpload from './pages/MediaUpload';
import CustomersController from './pages/CustomersController';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PosLayout />}>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Homepage />
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
						path="/cart"
						element={
							<RequireAuth>
								<CartPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/bills"
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
				</Route>

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
