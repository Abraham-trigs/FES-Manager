import { useState } from "react";
import { DollarIcon, FEScurrencyIcon, ConverterIcon } from "@/components/Convertor/ConvertorIcons";
import useCurrencyStore from "../../store/CurrencyStore";

const CurrencyConverter = ({ amount }) => {
  const { isFES, toggleCurrency } = useCurrencyStore();
  const [rotation, setRotation] = useState(0);

  // Conversion Logic: 1 USD = 90 FES Coins
  const convertedAmount = isFES ? amount * 90 : amount;

  const handleRotate = () => {
    setRotation((prev) => prev + 1980); // Faster and smoother spin
    toggleCurrency();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Converter Icon (Click to Switch Currency) */}
      <img
        src={ConverterIcon}
        alt="Convert Icon"
        className="w-6 h-auto cursor-pointer transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={handleRotate}
      />

      {/* Currency Icon (Changes between USD and FES) */}
      <img
        src={isFES ? FEScurrencyIcon : DollarIcon}
        alt="Currency Icon"
        className="w-auto h-6"
      />

      {/* Amount with Dynamic Color Based on Currency */}
      <span className={`text-lg font-bold ${isFES ? "text-greenNeon" : "text-cyanNeon"}`}>
        {isFES ? Math.round(convertedAmount) : amount}
      </span>
    </div>
  );
};

export default CurrencyConverter;
