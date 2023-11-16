import { useEffect } from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';

const Categories = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	useEffect(() => {
		categoriesStore.fetchCategories();
	}, []);

	const itemStyle = {
		display: 'flex',
		flexDirection: 'column-reverse',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const categoryStyle = {
		width: '100%',
		justifyContent: 'center',
		cursor: 'pointer',
	};

	const catWrap = {
		alignItems: 'end',
		marginBottom: '20px',
	};

	return (
		<div className="d-flex" style={catWrap}>
			<div
				key="all"
				style={categoryStyle}
				className={`d-flex category ${
					categoriesStore.selecedCategory === 0 && 'category-active'
				}`}
				onClick={() => categoriesStore.setSelecedCategory(0)}
			>
				<div style={itemStyle}>
					<h4 style={{ fontSize: '16px' }}>All</h4>
				</div>
			</div>
			{categoriesStore.categories &&
				categoriesStore.categories.map((category) => (
					<div
						key={category.name}
						style={categoryStyle}
						className={`d-flex category ${
							categoriesStore.selecedCategory === category.id &&
							'category-active'
						}`}
						onClick={() =>
							categoriesStore.setSelecedCategory(category.id)
						}
					>
						<div style={itemStyle}>
							<h4 style={{ fontSize: '16px' }}>
								{category.name}
							</h4>
							<img
								style={{ width: '80px' }}
								src={`${serverURL}/uploads/${category.image}`}
								alt=""
							/>
						</div>
					</div>
				))}
		</div>
	);
});

export default Categories;
