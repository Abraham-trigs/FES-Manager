import { useState } from "react";
import { DollarIcon, FEScurrencyIcon, ConverterIcon } from "@/components/Convertor/ConvertorIcons";
import useCurrencyStore from "../../store/CurrencyStore";

const CurrencyConverter = ({ amount }) => {
  const { isFES, toggleCurrency } = useCurrencyStore();
  const [rotation, setRotation] = useState(0);

  // Conversion Logic: 1 USD = 90 FES Coins
  const convertedAmount = isFES ? amount * 90 : amount;

  // Handles the rotation effect and currency switch
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

      {/* Currency Icon (Dynamically changes between USD and FES) */}
      <div className="flex items-center">
        {/* Currency Icon */}
        <img
          src={isFES ? FEScurrencyIcon : DollarIcon}
          alt="Currency Icon"
          className="w-full h-6" // Ensuring both logos are the same size
        />

        {/* Amount Display (Left-aligned text) */}
        <span
          className={`text-lg font-bold ${
            isFES ? "text-greenNeon" : "text-cyanNeon"
          } ml-2`}  // Adding left margin for spacing
        >
          {/* Dynamically adjusting font size for large values */}
          <span
            className={`transition-all duration-300 ease-in-out ${
              convertedAmount.toString().length > 6 ? "text-sm" : "text-lg"
            }`}
          >
            {isFES ? Math.round(convertedAmount) : amount}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
