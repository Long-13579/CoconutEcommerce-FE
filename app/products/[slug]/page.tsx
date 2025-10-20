"use client";
import ProductSection from "@/components/home/ProductSection";
import ProductCard from "@/components/home/ProductCard";
import ProductInfo from "@/components/productDetail/ProductInfo";
import { useParams } from "next/navigation";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import Modal from "@/components/uiComponents/Modal";
import { Star } from "lucide-react";
import React from "react";

const ProductPage = () => {
  const params = useParams();
  // Sửa lấy slug cho chắc chắn, tránh undefined
  let slug = "";
  if (typeof params === "string") {
    slug = params;
  } else if (params && typeof params.slug === "string") {
    slug = params.slug;
  } else if (params && Array.isArray(params.slug) && params.slug.length > 0) {
    slug = params.slug[0];
  }

  const [productDetail, setProductDetail] = React.useState<any>(null);
  React.useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`http://localhost:8000/api/products/${slug}`);
      const data = await res.json();
      setProductDetail(data);
    }
    loadProduct();
  }, [slug]);

  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = React.useState(false);

  React.useEffect(() => {
    async function fetchRelated() {
      if (productDetail?.category_name) {
        setLoadingRelated(true);
        const data = await import("@/service/ProductService").then(mod => mod.getProductsByCategory(productDetail.category_name));
        // Loại trừ sản phẩm đang xem
        setRelatedProducts((data || []).filter((p: any) => p.slug !== slug));
        setLoadingRelated(false);
      }
    }
    fetchRelated();
  }, [productDetail, slug]);

  return (
    <>
      <ProductInfo slug={slug} />

      <div className="main-max-width padding-x mx-auto">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Customer Reviews
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating display box */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">5.0</h1>
            <small className="text-gray-600 text-sm">of 10 review(s)</small>

            <div className="flex gap-2">
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-black w-5 h-5 cursor-pointer" />
              <Star className="fill-gray-100 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          {/* Rating Display Box ends */}

          {/* Rating progress bar */}

          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Excellent" numRating={10} />
            <RatingProgressBar rating="Very Good" numRating={8} />
            <RatingProgressBar rating="Good" numRating={6} />
            <RatingProgressBar rating="Fair" numRating={5} />
            <RatingProgressBar rating="Poor" numRating={3} />
          </div>

          {/* Rating progress bar ends */}
        </div>

        {/* Review modal form */}

        <div className="flex justify-center items-center w-full mb-5">
          <Modal>
            <ReviewForm />
          </Modal>
        </div>

        {/* Review modal form ends */}
      </div>

      <ReviewCardContainer />
      {/* Hiển thị sản phẩm cùng category, loại trừ sản phẩm đang xem */}
      <section id="product_section" className="main-max-width padding-x mx-auto my-16">
        <h2 className="my-9 text-center text-xl font-bold text-gray-800">
          Products from the same category
        </h2>
        {loadingRelated ? (
          <div>Đang tải sản phẩm...</div>
        ) : (
          <div className="flex-center flex-wrap gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ProductPage;
