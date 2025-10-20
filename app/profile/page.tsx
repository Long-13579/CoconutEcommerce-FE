"use client";
import React, { useEffect, useState } from "react";
import { getAddressByEmail, addOrUpdateAddress, updateUsername, Address } from "@/service/AddressService";
import OrderContainer from "@/components/order/OrderContainer";

const ProfilePage = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editAddress, setEditAddress] = useState<Address>({ street: "", city: "", state: "", phone: "" });

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    setUser({ username, email });
    if (email) {
      getAddressByEmail(email).then(addr => {
        if (addr) setAddress(addr);
      });
    }
  }, []);

  const handleSave = async () => {
    if (user?.email && editMode) {
      if (editUsername !== user.username) {
        const ok = await updateUsername(user.email, editUsername);
        if (!ok) {
          alert("Update username failed!");
          return;
        }
        localStorage.setItem("username", editUsername);
        setUser(prev => prev ? { ...prev, username: editUsername } : null);
      }
      
      const okAddr = await addOrUpdateAddress(user.email, editAddress);
      if (!okAddr) {
        alert("Update address failed!");
        return;
      }
      setAddress(editAddress);
      setEditMode(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          {!editMode && (
            <button 
              onClick={() => {
                setEditMode(true);
                setEditUsername(user?.username || "");
                setEditAddress(address || { street: "", city: "", state: "", phone: "" });
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>

        {user ? (
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Username</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{user.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Street Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editAddress.street}
                      onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter street address"
                    />
                  ) : (
                    <p className="text-gray-800">{address?.street || "Not set"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editAddress.city}
                      onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter city"
                    />
                  ) : (
                    <p className="text-gray-800">{address?.city || "Not set"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">State</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editAddress.state}
                      onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter state"
                    />
                  ) : (
                    <p className="text-gray-800">{address?.state || "Not set"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={editAddress.phone}
                      onChange={(e) => setEditAddress({ ...editAddress, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-800">{address?.phone || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {editMode && (
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading user information...</p>
          </div>
        )}
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
        <OrderContainer />
      </div>
    </div>
  );
};

export default ProfilePage;
