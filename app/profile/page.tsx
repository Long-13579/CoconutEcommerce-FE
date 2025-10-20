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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span role="img" aria-label="user" className="text-4xl">👤</span>
              User Profile
            </h1>
            {!editMode && (
              <button
                onClick={() => {
                  setEditMode(true);
                  setEditUsername(user?.username || "");
                  setEditAddress(address || { street: "", city: "", state: "", phone: "" });
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span role="img" aria-label="edit" className="text-xl">✏️</span>
                Edit Profile
              </button>
            )}
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Info Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user.username}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editAddress.street}
                          onChange={(e) => setEditAddress({ ...editAddress, street: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{address?.street || "Not provided"}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editAddress.city}
                          onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{address?.city || "Not provided"}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editAddress.state}
                          onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{address?.state || "Not provided"}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                      {editMode ? (
                        <input
                          type="tel"
                          value={editAddress.phone}
                          onChange={(e) => setEditAddress({ ...editAddress, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{address?.phone || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Loading user information...</div>
          )}

          {/* Action Buttons */}
          {editMode && (
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (user) {
                    let ok = true;
                    if (editUsername !== user.username) {
                      ok = await updateUsername(user.email, editUsername);
                    }
                    if (ok) {
                      const okAddr = await addOrUpdateAddress(user.email, editAddress);
                      if (okAddr) {
                        setUser({ ...user, username: editUsername });
                        setAddress(editAddress);
                        localStorage.setItem("username", editUsername);
                        setEditMode(false);
                      } else {
                        alert("Update address failed!");
                      }
                    } else {
                      alert("Update username failed!");
                    }
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
          <OrderContainer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
