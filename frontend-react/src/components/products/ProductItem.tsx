import { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { IProduct } from "../../models";

interface IProps {
  product: IProduct;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

const ProductItem: FC<IProps> = ({ product, onDelete, onClick }) => {
  const propagationHandler = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex w-full items-center justify-between border-2 border-green-900"
      onClick={() => onClick(product.id)}
    >
      <div>
        <div className="p-2">
          <span className="mr-2 text-lg">name:</span>
          <span>{product.name}</span>
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
      <div className="flex flex-col items-center gap-4 px-4 text-lg">
        <div className="flex items-center gap-3" onClick={propagationHandler}>
          <Link className="text-blue-800" to={`/products/edit/${product.id}`}>
            edit
          </Link>
          &nbsp;|&nbsp;
          <Link className="text-red-800" onClick={() => onDelete(product.id)} to="">
            delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
