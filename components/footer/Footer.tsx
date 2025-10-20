import React from 'react'
import { FaLinkedin, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full py-16">
      <div className="flex justify-between items-center main-max-width mx-auto padding-x flex-wrap gap-6 max-md:justify-center">
        {/* Logo & Description */}
        <div className="flex flex-col gap-6 w-[500px]">
          <h1 className="text-3xl font-bold text-white">Cocoverse</h1>
          <p className="text-[15px] text-gray-400 leading-[1.6]">
            Cocoverse is your tropical coconut marketplace! Discover, shop, and securely checkout a wide variety of coconut-based products: from coconut oil, coconut snacks, to eco-friendly coconut bowls and more. Enjoy a fresh, natural shopping experience inspired by the coconut world. 🥥🌴
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="text-gray-400 space-y-3">
            <li className="hover:text-white transition cursor-pointer">
              <a href="/" onClick={() => window.location.reload()}>Home</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/categories/coconut-bowls">Shop Coconut Bowls</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/categories/coconut-snacks">Shop Coconut Snacks</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/best-sellers">Best Sellers</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Categories</h2>
          <ul className="text-gray-400 space-y-3">
            <li className="hover:text-white transition cursor-pointer">
              <a href="/shipping">Shipping Information</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/returns">Returns & Refunds</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/warranty">Warranty Policy</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/faq">FAQ</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/track-order">Track Order</a>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <a href="/support">Contact Support</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <BsTwitterX className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-2xl text-gray-400 hover:text-white transition cursor-pointer" />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8">
  © {new Date().getFullYear()} Cocoverse. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer