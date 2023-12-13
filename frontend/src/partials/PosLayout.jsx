import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import PosMenu from './PosMenu';
import settingsStore from '../stores/settingsStore';
import Spinner from '../components/Spinner';

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
		<>
			{
				loading
					? <div >
						<div className="min-h-screen bg-gray-100 flex">
							<PosMenu />

							<div className="container mx-auto py-3 pl-20 px-6">
								<div className="w-full h-full p-2">
									<Outlet />
								</div>
							</div>
						</div>
					</div>
					: <Spinner />
			}
		</>
	);
});

export default DefaultLayout;
