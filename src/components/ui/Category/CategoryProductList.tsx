// import ProductCard1 from '../Product/ProductCard1';
import { Alert, Skeleton } from 'antd';
import { useCategoryTypeStore } from '../../../store/useStore';
import ProductCard1 from '../Product/ProductCard1';

export default function CategoryProductList() {
  const { productForCategoryType, isLoading } = useCategoryTypeStore();

  if (!isLoading && productForCategoryType?.length == 0)
    return (
      <div className="flex justify-center items-center">
        <Alert
          type="error"
          showIcon
          message="No Products Found"
          description="please select a category or try changing filters"
        />
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* <ProductCard1 />
      <ProductCard1 img="/image/img9.jpeg" />
      <ProductCard1 />
      <ProductCard1 img="/image/img9.webp" />
      <ProductCard1 />
      <ProductCard1 img="/image/img15.webp" />
      <ProductCard1 />
      <ProductCard1 img="/image/img12.webp" />
      <ProductCard1 />
      <ProductCard1 />
      <ProductCard1 img="/image/img10.jpeg" />
      <ProductCard1 /> */}
      {isLoading && (
        <>
          <Skeleton.Node active={true} style={{ width: '100%', height: 300 }} />
          <Skeleton.Node active={true} style={{ width: '100%', height: 300 }} />
          <Skeleton.Node active={true} style={{ width: '100%', height: 300 }} />
          <Skeleton.Node active={true} style={{ width: '100%', height: 300 }} />
        </>
      )}
      {productForCategoryType?.map((product) => (
        <ProductCard1
          img={product?.ProductColor[0]?.medias[0]?.url}
          productId={product.id}
          product_name={product.product_name}
          price={product.price}
        />
      ))}
    </div>
  );
}
