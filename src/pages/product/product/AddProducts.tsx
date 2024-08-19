import AddProductComp from "@/components/product/product/addProduct/AddProductComp";
import OutlineButton from "@/components/ui-kit/buttons/OutlineButton";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import useFetcherPost from "@/hooks/useFetcherPost";
import handleError from "@/validator/showError";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

const AddProducts = () => {
  const [productState, setProductState] = useState({
    name: "",
    price: "",
    discountPercentage: "",
    discountAmount: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    description: "",
    isActive: false,
  }); //also handle tag id and category id
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const url = `/v1/admins/product?name=${productState.name}&description=${productState.description}&price=${productState.price}&discountPrice=${productState.discountAmount}&discountType=0&length=${productState.length}&width=${productState.width}&height=${productState.height}&weight=${productState.weight}&status=0&count=0&thresholdCount=0&categoryId=9530ba1c-52fd-4e27-8835-504913f992e6&tagIds=75002dab-be34-4846-a502-40ae248979ed`;
  // const url ="/v1/admins/category?name=category1231&description=catgory 1&tagIds=75002dab-be34-4846-a502-40ae248979ed"
  const fetcherPost = useFetcherPost({
    headers: { "Content-Type": "multipart/form-data" },
  });

  const {
    trigger,
    //  isMutating
  } = useSWRMutation(url, fetcherPost<FormData, { id: string }>);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ selectedImages });
    try {
      if (selectedImages.length > 0) {
        const formData = new FormData();
        formData.append("images", selectedImages[0]);
        const res = await trigger(formData);
        console.log({ res });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex gap-4 items-center justify-start">
          <h6 className="ml-auto text-xl">اضافه کردن محصول جدید</h6>
          <OutlineButton>انصراف</OutlineButton>
          <PrimaryButtons type="submit">ذخیره</PrimaryButtons>
        </div>
        <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
          <AddProductComp
            productState={productState}
            setProductState={setProductState}
            setSelectedImages={setSelectedImages}
            selectedImages={selectedImages}
          />
        </div>
      </div>
    </form>
  );
};

export default AddProducts;
