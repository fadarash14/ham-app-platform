import React, { useEffect } from "react";
import Badge from "@/components/ui-kit/Badge";
import CheckBoxNew from "@/components/ui-kit/CheckBoxNew";
import useGetImage from "@/hooks/useGetImage";

interface ProductsListStructureProps {
  res: ProductSearchResponse[];
}

const ProductsListStructure: React.FC<ProductsListStructureProps> = ({
  res,
}) => {
  console.log({ res });
  const { pic, getPicture } = useGetImage();

  useEffect(() => {
    getPicture(res[0].images[0]);
  }, [getPicture, res]);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2">
            <CheckBoxNew />
          </th>
          <th className="p-2 text-start"></th>
          <th className="p-2 text-start w-1/2">نام محصول</th>
          <th className="p-2 text-center">وضعیت</th>
          <th className="p-2 text-center">تعداد گوناگونی</th>
          <th className="p-2 text-center">برچسب ها</th>
        </tr>
      </thead>
      <tbody>
        {res.map((product) => (
          <tr className="border-t" key={product.id}>
            <td className="p-2 text-start">
              <CheckBoxNew />
            </td>
            <td className="p-2 text-start">
              {/* //create acomponenet to show image */}
              <img
                src={pic}
                alt="product"
                className="w-10 h-10 mr-2 rounded-full"
              />
            </td>
            <td className="p-2 text-start w-1/3">
              <span>{product.name}</span>
            </td>
            <td className="p-2 text-center">
              <Badge
                color={product.status === 1 ? "green" : "gray"}
                text={product.status === 1 ? "فعال" : "غیر فعال"}
              />
            </td>
            <td className="p-2 text-center">?</td>
            <td className="p-2 text-center flex gap-2 justify-center">
              {product.tags.map((tags) => {
                return <Badge key={tags.id} color="gray" text={tags.name} />;
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsListStructure;
