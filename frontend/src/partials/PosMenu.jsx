import { observer } from 'mobx-react';
import {
	Link,
	useNavigate,
	useLocation
} from 'react-router-dom';

import {
	MdOutlineDashboardCustomize,
	MdOutlinePointOfSale,
	MdOutlineCategory,
	MdProductionQuantityLimits,
	MdOutlinePermMedia,
	MdLogout
} from "react-icons/md";

import { LuUsers2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import authStore from '../stores/authStore';
import dictionaryStore from '../stores/dictionaryStore';

const PosMenu = observer(() => {
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		authStore.logout();
		navigate('/login');
	}

	const getNavLinkStyle = (path) => {
		return `flex items-center space-x-4 px-4 py-3
			${location.pathname === path
				? 'relative bg-gradient-to-r from-rose-600 to-rose-400 text-white '
				: 'bg group text-gray-600 rounded-full'}`;
	}

	const navTextStyle = 'group-hover:text-gray-700';

	return (
		<div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg fixed left-0 bg-white top-0 z-1001">
			<div className="flex h-screen flex-col justify-between pt-2 pb-6">
				<div>
					<ul className="mt-6 space-y-2 tracking-wide">
						<li className="min-w-max">
							<Link to="/" className={getNavLinkStyle('/')}>
								<MdOutlineDashboardCustomize />
								<span className={navTextStyle}>{dictionaryStore.getString('pos')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link to="/orders" className={getNavLinkStyle('/orders')}>
								<MdOutlinePointOfSale />
								<span className={navTextStyle}>{dictionaryStore.getString('orders')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link to="/products" className={getNavLinkStyle('/products')}>
								<MdProductionQuantityLimits />
								<span className={navTextStyle}>{dictionaryStore.getString('products')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link to="/categories" className={getNavLinkStyle('/categories')}>
								<MdOutlineCategory />
								<span className={navTextStyle}>{dictionaryStore.getString('categories')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link to="/customers" className={getNavLinkStyle('/customers')}>
								<LuUsers2 />
								<span className={navTextStyle}>{dictionaryStore.getString('customers')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link to="/media" className={getNavLinkStyle('/media')}>
								<MdOutlinePermMedia />
								<span className={navTextStyle}>{dictionaryStore.getString('media')}</span>
							</Link>
						</li>
					</ul>
				</div>

				<div className="w-max -mb-3">
					<ul className="mt-6 space-y-2 tracking-wide">
						<li className="min-w-max">
							<Link to="/settings" className={getNavLinkStyle('/settings')}>
								<IoSettingsOutline />
								<span className={navTextStyle}>{dictionaryStore.getString('settings')}</span>
							</Link>
						</li>
						<li className="min-w-max">
							<Link onClick={logout} className={getNavLinkStyle('/logout')}>
								<MdLogout />
								<span className={navTextStyle}>{dictionaryStore.getString('logout')}</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
});

export default PosMenu;
