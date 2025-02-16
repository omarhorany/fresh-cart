import React from 'react';
import img1 from '../../assets/images/amazon-pay.png';
import img2 from '../../assets/images/paypal.png';
import img3 from '../../assets/images/mastercard.webp';
import img4 from '../../assets/images/American-Express-Color.png';
import img5 from '../../assets/images/get-apple-store.png';
import img6 from '../../assets/images/get-google-play.png';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 mt-10 w-full">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* App Download Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Get the FreshCart app</h2>
                    <p className="text-gray-600 mt-2">
                        We will send you a link, open it on your phone to download the app.
                    </p>
                    <div className="mt-3 flex w-full">
                        <input
                            type="email"
                            placeholder="Email .."
                            className="px-4 py-2 border rounded-l-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button className="bg-green-600 text-white px-4 w-1/4 py-2 rounded-r-lg hover:bg-green-700">
                            Share App Link
                        </button>
                    </div>
                </div>

                {/* Payment & App Store Links */}
                <div className="mt-16 grid md:grid-cols-2 gap-6 items-center">
                    {/* Payment Partners */}
                    <div className="flex flex-col items-center md:items-start ">
                        <p className="text-gray-600 font-bold ">Payment Partners</p>
                        <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
                            <img src={img1} alt="Amazon Pay" className="h-8" />
                            <img src={img4} alt="American Express" className="h-8" />
                            <img src={img3} alt="MasterCard" className="h-8" />
                            <img src={img2} alt="PayPal" className="h-8" />
                        </div>
                    </div>

                    {/* App Store Links */}
                    <div className="flex flex-col items-center md:items-end ">
                        <p className="text-gray-600 font-bold px-10">Get deliveries with FreshCart</p>
                        <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-end">
                            <img src={img5} alt="App Store" className="h-12" />
                            <img src={img6} alt="Google Play" className="h-12" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;