import Security from "@/assets/icons/Securty";
import { Button } from "@/components/ui/button";

const OrderSettings = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h5>My Profile</h5>
        <div className="flex justify-center items-center gap-2">
          <Security />
          <p className="highlight">Update Password</p>
        </div>
      </div>
      <div className="bg-white border border-gray-300 rounded-lg mt-8">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center justify-center gap-5">
            <img
              src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
              className="h-52 w-52 object-cover rounded-3xl border-[8px] border-white shadow-xl"
              alt=""
            />
            <div>
              <h6 className="mb-2">Manoj Tiwari</h6>
              <p>+91 83673783738</p>
            </div>
          </div>
          <Button className="bg-gray-100 hover:bg-gray-200 shadow-xl rounded-full py-2 px-5 text-blue-500">
            Edit
          </Button>
        </div>
        <div className="mt-28">
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5">
            <p className="highlight ml-3 text-gray-500 w-40">Email</p>
            <p className="highlight">Manoj@gmail.com</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5">
            <p className="highlight ml-3 text-gray-500 w-40">Address</p>
            <p className="highlight">Address</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5">
            <p className="highlight ml-3 text-gray-500 w-40">Billing address</p>
            <p className="highlight">Lorem huhsbe mjnsyue </p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5">
            <p className="highlight ml-3 text-gray-500 w-40">Code</p>
            <p className="highlight">2322123</p>
          </div>
          <div className="flex items-center gap-20 border-b border-gray-300 mb-5 pb-5">
            <p className="highlight ml-3 text-gray-500 w-40">
              Internal Koststelle
            </p>
            <p className="highlight">Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSettings;
