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
  processing?: boolean;
}

const ProductForm: FC<IProps> = props => {
  const form = useSchema(productSchema, props.initial);

  const { name, description, price, sku } = form.data;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const { ok, data, errors } = form.validate();

    if (ok) {
      props.onSubmit(data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-10 rounded-lg border-2 border-gray-800 bg-white shadow-md">
        <div className="my-1 border-b-2 border-gray-700 text-lg">{props.formTitle}</div>
        <form
          className="mt-10 flex flex-col gap-3"
          onSubmit={submitHandler}
          onReset={form.resetForm}
        >
          <div>
            <MyInput
              label="name"
              name="name"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={name.value}
            />
            {name.touched && <div className="my-5 text-xs text-red-600">{name.error}</div>}
          </div>

          <div>
            <MyTextArea
              rows={3}
              label="description"
              name="description"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={description.value}
            />
            {description.touched && (
              <div className="my-5 text-xs text-red-600">{description.error}</div>
            )}
          </div>

          <div>
            <MyInput
              type="number"
              label="Price"
              name="price"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={price.value}
            />
            {price.touched && <div className="my-5 text-xs text-red-600">{price.error}</div>}
          </div>

          <div>
            <MyInput
              type="number"
              label="Sku"
              name="sku"
              onChange={form.updateField}
              onBlur={form.blurField}
              value={sku.value}
            />
            {sku.touched && <div className="my-5 text-xs text-red-600">{sku.error}</div>}
          </div>

          <MyButton type="submit">{props.processing ? "processing" : props.buttonName}</MyButton>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
