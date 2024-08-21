import {
  LoadingSpinnerPage,
  LoadingSpinnerTable,
} from "@/components/ui-kit/LoadingSpinner";
import Pagination from "@/components/ui-kit/Pagination";
import useFetcherPost from "@/hooks/useFetcherPost";
import { useState } from "react";
import useSWR from "swr";
const ActivateProduct = ({ pageSize }: { pageSize: number }) => {
  const [page, setPage] = useState(1);
  const fetcherPost = useFetcherPost();
  const fetchUrl = `/v1/admins/product/search?page=${page-1}&size=${pageSize}&forceFirstAndLastRels=true`;

  const { data: productData, isLoading: productIsLoading } = useSWR<
    RootResponseNew<ICategorySearchResponseList>
  >(fetchUrl, {
    fetcher: () =>
      fetcherPost<
        { id: string; name: string; status: number },
        RootResponseNew<ICategorySearchResponseList>
      >(fetchUrl, {
        arg: {
          name: "",
          status: 1, //1 for active
          id: "",
        },
      }),
  });

  if (productIsLoading) return <LoadingSpinnerTable />;

  console.log(productData);

  return (
    <>
      <h1>ActivateProduct</h1>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={productData?.page.totalPages || 0}
      />
    </>
  );
};

export default ActivateProduct;
