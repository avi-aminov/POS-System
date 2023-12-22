import { observer } from 'mobx-react';
import {
	Link,
	useNavigate,
	useLocation
} from 'react-router-dom';

import authStore from '../stores/authStore';
import dictionaryStore from '../stores/dictionaryStore';

import { MdSettingsSystemDaydream, MdPointOfSale, MdPermMedia } from "react-icons/md";
import { IoCard, IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaListOl, FaUsers } from "react-icons/fa";

const PosMenu = observer(() => {
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		authStore.logout();
		navigate('/login');
	}

	const getNavLinkStyle = (path) => {
		return `group relative rounded-xl p-2 hover:bg-gray-50
			${location.pathname === path
				? ' bg-gray-100 text-red-700'
				: ' text-gary-400 '}`;
	}

	const getMenuSelectedTitle = (content) => {
		return <div className="absolute z-20 inset-y-0 left-12 hidden items-center group-hover:flex">
			<div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
				<div className="absolute inset-0 -left-1 flex items-center">
					<div className="h-2 w-2 rotate-45 bg-white" />
				</div>
				{content}
			</div>
		</div>
	}

	const getNavLink = (to, icon, isMain = false, action = null) => {
		if (action) {
			return <Link onClick={action} className={getNavLinkStyle(`/${!isMain ? to : ""}`)}>
				{icon}
				{getMenuSelectedTitle(dictionaryStore.getString(to))}
			</Link>
		} else {
			return <Link to={`/${!isMain ? to : ""}`} className={getNavLinkStyle(`/${!isMain ? to : ""}`)}>
				{icon}
				{getMenuSelectedTitle(dictionaryStore.getString(to))}
			</Link>
		}
	};

	return (
		<aside className="flex sticky top-0 h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
			<div className="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2">
				<MdSettingsSystemDaydream size={34} />
			</div>
			<nav className="flex flex-1 flex-col gap-y-4 pt-10">
				{getNavLink('pos', <MdPointOfSale size={24} />, true)}
				{getNavLink('orders', <IoCard size={24} />)}
				{getNavLink('products', <FaListOl size={24} />)}
				{getNavLink('categories', <BiSolidCategoryAlt size={24} />)}
				{getNavLink('customers', <FaUsers size={24} />)}
				{getNavLink('media', <MdPermMedia size={24} />)}
			</nav>
			<div className="flex flex-col items-center gap-y-4 py-10">
				{getNavLink('settings', <IoMdSettings size={24} />)}
				{getNavLink('logout', <IoLogOut size={24} />, false, logout)}
			</div>
		</aside>
	);
});

export default PosMenu;
