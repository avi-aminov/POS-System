import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import PosMenu from './PosMenu';
import settingsStore from '../stores/settingsStore';
import { Spinner } from "@material-tailwind/react";

const DefaultLayout = observer(() => {
	const [loading, setLoading] = useState(false);

	// Load settings
	useEffect(() => {
		const fetchSettings = async () => {
			await settingsStore.fetchSettings();
			setLoading(true);
		};

		fetchSettings();
	}, []);

	return (
		// h-screen overflow-hidden
		<div className=''>
			{
				loading
					?
					<div className="wrap h-screen overflow-hidden">
						<div className="left-sidebar z-1001 w-[80px] fixed top-0 left-0 h-full">
							<PosMenu />
						</div>
						<Outlet />
					</div>
					:
					<Spinner />
			}
		</div>
	);
});

export default DefaultLayout;
