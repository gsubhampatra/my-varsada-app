import { useState } from 'react';
import Footer from '../ui/Layout/Footer';
import Navbar from '../ui/Layout/Navbar';
import SafeArea from '../ui/Layout/SafeArea';
import Filter from '../ui/ProductList/Filter/Filter';
import ProductList from '../ui/ProductList/ProductList';
import ProductListFilterHeader from '../ui/ProductList/ProductListFilterHeader';
import ProductListNav from '../ui/ProductList/ProductListNav';
import { useSearchParams } from 'react-router-dom';

export default function ProductListing() {
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get('search');

  return (
    <SafeArea>
      <Navbar />
      <div className="w-full p-11">
        <ProductListNav />
        <ProductListFilterHeader
          setIsShowFilters={setIsShowFilters}
          isShowFilters={isShowFilters}
        />
        <div
          className={`grid transition-all ${isShowFilters ? 'grid-cols-[30%_70%]' : 'grid-cols-[0%_100%]'} gap-8 my-4`}
        >
          {isShowFilters ? <Filter /> : <div></div>}
          <ProductList
            isShowFilters={isShowFilters}
            searchString={searchString}
          />
        </div>
      </div>
      <Footer />
    </SafeArea>
  );
}
