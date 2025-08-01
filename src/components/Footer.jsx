import {Instagram, Twitter, Facebook, Dumbbell} from 'lucide-react'




const Footer = () => {
  return (
      <footer id='footer' className="bg-slate-950 text-white py-20 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-around gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="h-6 w-6 text-orange-600" />
                <span className="ml-2 text-xl font-bold">Minimalist Gyms</span>
              </div>
              <p className="text-sm">Transform your body, transform your life.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className=" hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className=" hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className=" hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <address className=" not-italic text-sm">
                123 Fitness Avenue<br />
                Bangalore, KA 560001<br />
                India<br /><br />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a><br />
                <a href="mailto:info@fitzone.com" className="hover:text-white">info@minimalistgyms.com</a>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} Minimalist Gyms. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
