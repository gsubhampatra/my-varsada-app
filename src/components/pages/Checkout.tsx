import ConfirmProduct from '../ui/Checkout/ConfirmProduct';
import Footer from '../ui/Layout/Footer';
import Navbar from '../ui/Layout/Navbar';
import SafeArea from '../ui/Layout/SafeArea';

export default function Checkout() {
  return (
    <SafeArea>
      <Navbar />
      <div className="w-full h-[50vh] flex justify-center items-center  bg-cover text-white bg-img">
        <h3 className="capitalize">View Varsada Bag</h3>
      </div>
      <div className="w-full p-11">
        <ConfirmProduct />
      </div>
      <Footer />
    </SafeArea>
  );
}
