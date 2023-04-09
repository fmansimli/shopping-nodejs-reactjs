import { FC, FormEvent } from "react";
import { IProduct } from "../../models";
import { MyButton, MyInput, MyTextArea } from "../ui";

import { useSchema } from "@validify-js/react";
import { productSchema } from "../../validations/product.schema";

interface IProps {
  initial?: IProduct;
  formTitle: string;
  buttonName: string;
  onSubmit: (product: Partial<IProduct>) => void;
}

const ProductForm: FC<IProps> = props => {
  const form = useSchema(productSchema, props.initial);

  const { title, description, price, sku } = form.data;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const { ok, data, errors } = form.validate();

    if (ok) {
      props.onSubmit(data);
    }
  };
  return (
    <div className="py-10">
      <div className="my-1 border-b-2 border-gray-700 text-lg">{props.formTitle}</div>
      <form className="mt-10" onSubmit={submitHandler} onReset={form.resetForm}>
        <MyInput
          label="title"
          name="title"
          onChange={form.updateField}
          onBlur={form.blurField}
          value={title.value}
        />
        {title.touched && <div className="my-5 text-xs text-red-600">{title.error}</div>}

        <MyTextArea
          rows={10}
          label="description"
          name="description"
          onChange={form.updateField}
          onBlur={form.blurField}
          value={description.value}
        />
        {description.touched && (
          <div className="my-5 text-xs text-red-600">{description.error}</div>
        )}

        <MyInput
          type="number"
          label="Price"
          name="price"
          onChange={form.updateField}
          onBlur={form.blurField}
          value={price.value}
        />
        {price.touched && <div className="my-5 text-xs text-red-600">{price.error}</div>}

        <MyInput
          type="number"
          label="Sku"
          name="sku"
          onChange={form.updateField}
          onBlur={form.blurField}
          value={sku.value}
        />
        {sku.touched && <div className="my-5 text-xs text-red-600">{sku.error}</div>}

        <MyButton type="submit">{props.buttonName}</MyButton>
      </form>
    </div>
  );
};

export default ProductForm;
