import Footer from '../ui/Layout/Footer';
import Navbar from '../ui/Layout/Navbar';
import SafeArea from '../ui/Layout/SafeArea';
import DreamListNav from '../ui/DreamList/DreamListNav';
import DreamListProducts from '../ui/ProductList/DreamListProducts';

export default function DreamList() {
  return (
    <SafeArea>
      <Navbar />
      <div className="w-full p-11">
        <DreamListNav />
        <div className="my-4">
          <DreamListProducts />
        </div>
      </div>
      <Footer />
    </SafeArea>
  );
}
