import React, { useContext } from 'react';
import Item from '../Item/Item';
import { Context } from '../../Context/Context';

const CategoryFilterProducts = ({ title,type }) => {
  const { productsdata, loading, error } = useContext(Context);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter productsdata where category is 'shirt'
  const filteredProducts = productsdata.filter(item => item.category === type);
  return (
    <div className="px-10 py-4">
      <h1 className="mb-4 text-[26px] text-center">{title} Category</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-x-1 gap-y-6">
        {filteredProducts.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterProducts;
