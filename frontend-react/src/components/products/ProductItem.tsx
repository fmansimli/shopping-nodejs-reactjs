import { FC } from "react";
import { Link } from "react-router-dom";

import { IProduct } from "../../models";

interface IProps {
  product: IProduct;
  onDelete: (id: number) => void;
  onAddToCart: (product: IProduct) => void;
}

const ProductItem: FC<IProps> = ({ product, onDelete, onAddToCart }) => {
  return (
    <div className="flex w-2/5 items-center justify-between border-2 border-green-900">
      <div>
        <div className="p-2">
          <span className="mr-2 text-lg">title:</span>
          <span>{product.title}</span>
        </div>
        <div className="p-2">
          <span className="mr-2 text-lg">price:</span>
          <span>{product.price} $</span>
        </div>
        <div className="p-2">
          <span className="mr-2 text-lg">sku:</span>
          <span>{product.sku}</span>
        </div>
      </div>
      <div className="flex items-center px-4 text-lg">
        <Link className="text-green-800" to="" onClick={() => onAddToCart(product)}>
          + cart
        </Link>
        &nbsp;| &nbsp;
        <Link className="text-blue-800" to={`/products/edit/${product.id}`}>
          edit
        </Link>
        &nbsp;|&nbsp;
        <Link className="text-red-800" onClick={() => onDelete(product.id)} to="">
          delete
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
