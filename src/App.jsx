import React, { useState } from 'react'; // Import useState
import data from './data.json';
import { Phone, MapPin, Instagram, Facebook, Youtube, CheckCircle, Mail, UserPlus, QrCode, X } from 'lucide-react'; // Added QrCode and X icons
import { FaWhatsapp } from "react-icons/fa";
import QRCode from "react-qr-code"; // Import the QR library

function App() {
  const [showQR, setShowQR] = useState(false); // State to toggle modal

  // Logic to generate and download the vCard
  const handleSaveContact = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
N:;${data.name};;;
TITLE:${data.designation || 'Service Provider'}
TEL;TYPE=CELL:${data.mobile}
EMAIL;TYPE=WORK:${data.email}
ADR;TYPE=WORK:;;${data.address};;;;
URL;TYPE=Website:${window.location.href} 
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.name.replace(/\s+/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center relative">
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">Scan to Connect</h3>
            <p className="text-slate-500 mb-6 text-sm">Point your camera at the code below</p>
            
            <div className="bg-white p-2 rounded-lg inline-block">
                {/* This generates the QR pointing to the current page URL */}
                <QRCode 
                  value={window.location.href} 
                  size={200}
                  level={"H"} // High error correction
                />
            </div>
            
            <p className="mt-6 text-xs text-gray-400">@{data.name}</p>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
        
        {/* Header Section */}
        <div className="bg-slate-900 text-white p-8 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10"></div>
            
            {/* QR Toggle Button (Top Right) */}
            <button 
                onClick={() => setShowQR(true)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-md"
                title="Show QR Code"
            >
                <QrCode size={20} className="text-white" />
            </button>

            <h1 className="text-3xl font-bold tracking-tight relative z-10">{data.name}</h1>
            <p className="text-blue-200 mt-1 relative z-10">{data.designation || 'Service Provider'}</p>
        </div>

        {/* Content Body */}
        <div className="p-8">
          
          <div className="space-y-4 mb-8">
            <ContactRow icon={<Phone size={20} />} text={data.mobile} href={`tel:${data.mobile}`} />
            <ContactRow icon={<Mail size={20} />} text={data.email} href={`mailto:${data.email}`} />
            <ContactRow icon={<MapPin size={20} />} text={data.address} />
          </div>

          <hr className="border-gray-100 my-6" />

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 uppercase tracking-wider text-sm">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-slate-700 text-sm font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100">
            <SocialIcon Link={data.socials.instagram} Icon={Instagram} color="text-pink-600" />
            <SocialIcon Link={data.socials.facebook} Icon={Facebook} color="text-blue-600" />
            <SocialIcon Link={data.socials.whatsapp} Icon={FaWhatsapp} color="text-green-500" />
            
            <button 
              onClick={handleSaveContact}
              className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 ml-2 active:scale-95 transform duration-150"
            >
              <UserPlus size={18} />
              <span className="text-sm font-semibold">Save Contact</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ... Keep your ContactRow and SocialIcon components exactly as they were ...
const ContactRow = ({ icon, text, href }) => (
  <div className="flex items-start space-x-3 text-slate-600 hover:text-slate-900 transition-colors">
    <div className="mt-1 text-blue-600">{icon}</div>
    {href ? (
      <a href={href} className="hover:underline font-medium">{text}</a>
    ) : (
      <span className="font-medium">{text}</span>
    )}
  </div>
);

const SocialIcon = ({ Link, Icon, color }) => (
  <a 
    href={Link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`${color} hover:opacity-80 transform hover:scale-110 transition-transform p-2 bg-gray-50 rounded-full`}
  >
    <Icon size={28} />
  </a>
);

export default App;