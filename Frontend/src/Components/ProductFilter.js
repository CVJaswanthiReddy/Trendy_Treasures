import React, { useState } from "react";

const ProductFilter = ({
  priceRange,
  setPriceRange,
  rating,
  setRating,
  category,
  setCategory,
  brand,
  setBrand,
  size,
  setSize,
  fabric,
  setFabric,
  dressType,
  setDressType,
  setSortOrder, // Add a function to set the sort order
}) => {
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isFabricOpen, setIsFabricOpen] = useState(false);
  const [isDressTypeOpen, setIsDressTypeOpen] = useState(false);

  const allBrands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];
  const allSizes = ["S", "M", "L", "XL", "XXL"];
  const allFabrics = ["Cotton", "Silk", "Linen", "Polyester"];
  const allDressTypes = ["Casual", "Formal", "Party", "Maxi", "Mini"];

  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="w-full md:w-72 p-6 bg-white rounded-lg shadow-xl sticky top-0">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Filter Products
      </h3>

      {/* Category Filter (Checkboxes) */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Category</h4>
        <div className="space-y-2">
          <label className="inline-flex items-center text-gray-800">
            <input
              type="checkbox"
              onChange={() => setCategory("electronics")}
              checked={category === "electronics"}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Electronics</span>
          </label>
          <label className="inline-flex items-center text-gray-800">
            <input
              type="checkbox"
              onChange={() => setCategory("clothing")}
              checked={category === "clothing"}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Clothing</span>
          </label>
          <label className="inline-flex items-center text-gray-800">
            <input
              type="checkbox"
              onChange={() => setCategory("home")}
              checked={category === "home"}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Home</span>
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Price Range</h4>
        <div className="space-y-3">
          <label className="inline-flex items-center text-gray-800">
            <input
              type="radio"
              name="price"
              value="0,50"
              onChange={() => setPriceRange("0,50")}
              checked={priceRange === "0,50"}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Under $50</span>
          </label>
          <label className="inline-flex items-center text-gray-800">
            <input
              type="radio"
              name="price"
              value="50,100"
              onChange={() => setPriceRange("50,100")}
              checked={priceRange === "50,100"}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">$50 - $100</span>
          </label>
          <label className="inline-flex items-center text-gray-800">
            <input
              type="radio"
              name="price"
              value="100,200"
              onChange={() => setPriceRange("100,200")}
              checked={priceRange === "100,200"}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">$100 - $200</span>
          </label>
        </div>
      </div>

      {/* Brand Filter (Collapsible) */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <h4 className="text-lg font-medium text-gray-800">Brand</h4>
          <span className="text-gray-600">{isBrandOpen ? "▼" : "▲"}</span>
        </div>
        {isBrandOpen && (
          <div className="mt-3">
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search brands"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <div className="flex flex-col space-y-2">
              {filteredBrands.map((brandItem) => (
                <label
                  key={brandItem}
                  className="inline-flex items-center text-gray-800"
                >
                  <input
                    type="checkbox"
                    onChange={() => setBrand(brandItem)}
                    checked={brand === brandItem}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <span className="ml-2">{brandItem}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Filter (Collapsible) */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
        >
          <h4 className="text-lg font-medium text-gray-800">Size</h4>
          <span className="text-gray-600">{isSizeOpen ? "▼" : "▲"}</span>
        </div>
        {isSizeOpen && (
          <div className="flex flex-col space-y-2">
            {allSizes.map((sizeItem) => (
              <label
                key={sizeItem}
                className="inline-flex items-center text-gray-800"
              >
                <input
                  type="checkbox"
                  onChange={() => setSize(sizeItem)}
                  checked={size === sizeItem}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2">{sizeItem}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Fabric Filter (Collapsible) */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsFabricOpen(!isFabricOpen)}
        >
          <h4 className="text-lg font-medium text-gray-800">Fabric</h4>
          <span className="text-gray-600">{isFabricOpen ? "▼" : "▲"}</span>
        </div>
        {isFabricOpen && (
          <div className="flex flex-col space-y-2">
            {allFabrics.map((fabricItem) => (
              <label
                key={fabricItem}
                className="inline-flex items-center text-gray-800"
              >
                <input
                  type="checkbox"
                  onChange={() => setFabric(fabricItem)}
                  checked={fabric === fabricItem}
                  className="form-checkbox h-5 w-5 text-pink-500"
                />
                <span className="ml-2">{fabricItem}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Dress Type Filter (Collapsible) */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsDressTypeOpen(!isDressTypeOpen)}
        >
          <h4 className="text-lg font-medium text-gray-800">Type of Dresses</h4>
          <span className="text-gray-600">{isDressTypeOpen ? "▼" : "▲"}</span>
        </div>
        {isDressTypeOpen && (
          <div className="flex flex-col space-y-2">
            {allDressTypes.map((dressTypeItem) => (
              <label
                key={dressTypeItem}
                className="inline-flex items-center text-gray-800"
              >
                <input
                  type="checkbox"
                  onChange={() => setDressType(dressTypeItem)}
                  checked={dressType === dressTypeItem}
                  className="form-checkbox h-5 w-5 text-yellow-500"
                />
                <span className="ml-2">{dressTypeItem}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sorting Options */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Sort By</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
