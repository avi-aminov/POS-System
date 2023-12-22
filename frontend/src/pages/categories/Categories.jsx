import { useEffect } from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';

const Categories = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	useEffect(() => {
		categoriesStore.fetchCategories();
	}, []);

	return (
		<>
			{categoriesStore.categories.length > 0 ? (
				<div className="flex pb-4 overflow-x-auto">
					<div
						className={`flex pl-12 pr-12 items-center justify-center cursor-pointer border-2 ${categoriesStore.selectedCategory === 0
							? 'border-blue-500 text-blue-500'
							: 'border-black text-black'
							} mx-2`}
						onClick={() => categoriesStore.setSelectedCategory(0)}
					>
						<div className="flex flex-col-reverse items-center">
							<h4 className="text-center text-base mb-2">{dictionaryStore.getString('all')}</h4>
						</div>
					</div>

					{categoriesStore.categories &&
						categoriesStore.categories.map((category) => (
							<div
								key={category.name}
								className={`flex pl-12 pr-12 items-center justify-center cursor-pointer border-2 ${categoriesStore.selectedCategory === category._id
									? 'border-blue-500 text-blue-500'
									: 'border-black text-black'
									} mx-2`}
								onClick={() => categoriesStore.setSelectedCategory(category._id)}
							>
								<div className="flex flex-col-reverse items-center">
									<h4 className="text-center text-base mb-2">{category.name}</h4>
									{category.image && (
										<img
											src={`${serverURL}/uploads/${category.image}`}
											alt=""
											className="w-40 object-contain"
										/>
									)}
								</div>
							</div>
						))}
				</div>
			) : (
				''
			)}
		</>
	);
});

export default Categories;
