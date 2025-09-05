import React from 'react'
import Image from "next/image"
import Button from '../uiComponents/Button'

const ProductInfo = () => {
  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}
    
      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <Image
          src="/coconut_product.jpg"
          alt="coconut product"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Cold-Pressed Coconut Oil</h1>
          <h3 className="text-2xl font-semibold text-black">$8.00</h3>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Product Details</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            100% cold-pressed coconut oil from Ben Tre coconuts. Perfect for cooking, skin care, hair care, and wellness. Pure, natural, and versatile for your daily needs.
          </p>
        </div>

        {/* Buttons */}
    <div className='flex py-3 items-center gap-4 flex-wrap border'>
      <Button className="default-btn">
        Add to Cart
      </Button>

      <Button className="wish-btn">
        Add to Wishlist
      </Button>
    </div>
        
      </div>
    </div>
  )
}

export default ProductInfo