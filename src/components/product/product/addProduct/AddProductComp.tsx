import { TextareaField } from "@/components/login/TextareaField";
import { TextField } from "@/components/login/TextField";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { useState } from "react";
import MySwitch from "@/components/ui-kit/MySwitch";
import ImageUploaderProduct from "./ImageUploaderProduct";

type ProductState = {
  name: string;
  price: string;
  discountPercentage: string;
  discountAmount: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  description: string;
  isActive: boolean;
};

interface IProps {
  productState: ProductState;
  setProductState: React.Dispatch<React.SetStateAction<ProductState>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  selectedImages: File[];
}

const AddProductComp = ({
  productState,
  setProductState,
  setSelectedImages,
  selectedImages,
}: IProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedOption | null>(null);
  const [selectedTags, setSelectedTags] = useState<SelectedOption | null>(null);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggleActive = () => {
    setProductState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  return (
    <div className="p-4 rounded flex flex-col md:flex-row justify-between w-full gap-10">
      <div className="md:w-1/2 w-full">
        <div className="mb-4 w-full">
          <TextField
            label="نام محصول"
            placeholder="نام محصول"
            state={productState.name}
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="قیمت محصول (تومان)"
            placeholder="قیمت محصول"
            state={productState.price}
            onChange={handleChange}
            name="price"
            type="text"
            id="price"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="تخفیف (درصد)"
            placeholder="تخفیف به صورت درصد"
            state={productState.discountPercentage}
            onChange={handleChange}
            name="discountPercentage"
            type="text"
            id="discountPercentage"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="تخفیف (مبلغ ثابت - تومان)"
            placeholder="تخفیف به صورت مبلغ ثابت"
            state={productState.discountAmount}
            onChange={handleChange}
            name="discountAmount"
            type="text"
            id="discountAmount"
          />
        </div>
        <div className="mb-4 w-full">
          <ListBoxSelect
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            items={[{ label: "دسته 1", value: "1" }]} // Replace with actual category options
            label="انتخاب دسته‌بندی"
          />
        </div>
        <div className="mb-4 w-full">
          <ListBoxSelect
            selected={selectedTags}
            setSelected={setSelectedTags}
            items={[{ label: "برچسب 1", value: "1" }]} // Replace with actual tag options
            label="انتخاب برچسب‌ها"
            // multiple
          />
        </div>
        <div className="mb-4 w-full">
          <TextareaField
            label="توضیحات"
            placeholder="توضیحات محصول"
            state={productState.description}
            onChange={handleChange}
            name="description"
            id="description"
            height="150px"
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex flex-col items-center">
        {/* <OutlineButton onClick={handleToggleActive} fullWidth className="mt-4">
          {productState.isActive ? "غیرفعال کردن محصول" : "فعال کردن محصول"}
        </OutlineButton> */}
        <div className="mb-4 w-full pr-2 py-4 mt-4   rounded-md border-0  block shadow-sm ring-1 ring-inset placeholder:text-gray-400 text-sm leading-6 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-slate-300 ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset  focus:ring-indigo-400 dark:focus:ring-indigo-500">
          <MySwitch
            checked={productState.isActive}
            onChange={handleToggleActive}
            label={productState.isActive ? "فعال" : "غیرفعال"}
            noSpace
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="طول (cm)"
            placeholder="طول"
            state={productState.length}
            onChange={handleChange}
            name="length"
            type="text"
            id="length"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="عرض (cm)"
            placeholder="عرض"
            state={productState.width}
            onChange={handleChange}
            name="width"
            type="text"
            id="width"
          />
        </div>
        <div className="mb-4 w-full">
          <TextField
            label="ارتفاع (cm)"
            placeholder="ارتفاع"
            state={productState.height}
            onChange={handleChange}
            name="height"
            type="text"
            id="height"
          />
        </div>
        <div className="mb-16 w-full">
          <TextField
            label="وزن (g)"
            placeholder="وزن"
            state={productState.weight}
            onChange={handleChange}
            name="weight"
            type="text"
            id="weight"
          />
        </div>
        <div className="mb-4 w-full flex justify-center">
          <ImageUploaderProduct
            bannerHeight={100}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductComp;
