import CoinCredited from '../ui/coinActivity/CoinCredited';
import CoinsReedemed from '../ui/coinActivity/CoinsReedemed';
import Footer from '../ui/Layout/Footer';
import Navbar from '../ui/Layout/Navbar';
import SafeArea from '../ui/Layout/SafeArea';
import Tabs from '../ui/Layout/Tabs';

export default function CoinActivity() {
  const Tab = [
    { name: 'Coins Credited', component: <CoinCredited /> },
    { name: 'Coins Reedemed', component: <CoinsReedemed /> },
  ];
  return (
    <>
      <SafeArea>
        <Navbar />
        <div className="p-11 min-h-[55vh]">
          <Tabs tabs={Tab} gap={3} />
        </div>
        <Footer />
      </SafeArea>
    </>
  );
}
