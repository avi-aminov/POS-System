import { useEffect } from 'react';
import { observer } from 'mobx-react';
import categoriesStore from '../../stores/categoriesStore';
import dictionaryStore from '../../stores/dictionaryStore';
import {
	CategoriesItem,
	CategoriesWrap,
	CategoryWrapper
} from './Categories.style';

const Categories = observer(() => {
	const serverURL = import.meta.env.VITE_SERVER_URL;

	useEffect(() => {
		categoriesStore.fetchCategories();
	}, []);

	return (
		<CategoriesWrap>
			<CategoryWrapper
				isSelected={categoriesStore.selecedCategory === 0}
				onClick={() => categoriesStore.setSelecedCategory(0)} >
				<CategoriesItem>
					<h4>{dictionaryStore.getString('all')}</h4>
					<img src={`${serverURL}/global/select-all.jpg`} alt="" />
				</CategoriesItem>
			</CategoryWrapper>

			{categoriesStore.categories && categoriesStore.categories.map((category) => (
				<CategoryWrapper
					key={category.name}
					isSelected={categoriesStore.selecedCategory === category.id &&
						'category-active'}
					onClick={() => categoriesStore.setSelecedCategory(category.id)}
				>
					<CategoriesItem>
						<h4>{category.name}</h4>
						<img src={`${serverURL}/uploads/${category.image}`} alt="" />
					</CategoriesItem>
				</CategoryWrapper>
			))}
		</CategoriesWrap>
	);
});

export default Categories;
