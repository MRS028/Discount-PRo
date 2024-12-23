import React from "react";

const BrandExtrapage = ({ brands }) => {
  return (
    <div className=" text-center">
      <h2 className="text-3xl font-bold text-center mb-6">Brands Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[95%] mb-5 mx-auto gap-5 text-left">
      {brands.map((brand) => (
        <div
          key={brand._id}
          className=" max-w-sm w-full rounded-lg shadow-lg border border-gray-200 p-4"
        >
          
          <div className="flex flex-col  justify-between">
            <div className="flex gap-1">
            <img
              src={brand.brand_logo}
              alt={brand.brand_name}
              className="w-20 h-16 object-contain"
            />
            {/* <h3 className="text-xl font-semibold text-gray-800"> 
                {brand.brand_name}</h3> */}
            </div>
            
            <p className="text-md text-gray-600 mt-1">
              <strong>Category:</strong> {brand.category}
            </p>
            <p className="text-sm opacity-85 text-gray-500 mt-3">{brand.details}</p>
          </div>
        </div>
      ))}


      </div>
    </div>
  );
};

export default BrandExtrapage;
