import { observer } from 'mobx-react';
import Categories from '../categories/Categories';
import Products from '../products/Products';
import ProductSearch from '../products/ProductSearch';
import Cashier from './cashier/Cashier';

//height: calc(100vh - 200px);
// overflow: auto;

const Pos = observer(() => {
    return (
        <div className="content overflow-y-auto">
            <div className="p-8" style={{ width: 'calc(100% - 450px)', paddingLeft: 'calc(80px + 2rem)' }}>
                <div>
                    <div>
                        <Categories />
                        <ProductSearch />
                    </div>
                    <Products />
                </div>
            </div>
            <div className="right-sidebar w-[450px] fixed top-0 right-0 h-full bg-gray-800">
                <Cashier />
            </div>
        </div>
    );
});

export default Pos;
