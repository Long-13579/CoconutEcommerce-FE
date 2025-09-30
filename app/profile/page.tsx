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
    <div className="main-max-width mx-auto my-16 p-6 bg-white rounded-2xl shadow-2xl">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span>👤</span> User Profile
            <button className="ml-2 text-blue-600 hover:text-blue-800" onClick={() => {
              setEditMode(true);
              setEditUsername(user?.username || "");
              setEditAddress(address || { street: "", city: "", state: "", phone: "" });
            }} title="Edit"><span>✏️</span></button>
          </h2>
          {user ? (
            <>
              <div className="w-full flex flex-col gap-2 text-lg">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Username:</span>
                  {editMode ? (
                    <input className="border rounded px-2 py-1" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
                  ) : (
                    <span className="text-gray-900">{user.username}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                {address ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Street:</span>
                      {editMode ? (
                        <input className="border rounded px-2 py-1" value={editAddress.street} onChange={e => setEditAddress({ ...editAddress, street: e.target.value })} />
                      ) : (
                        <span className="text-gray-900">{address.street}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">City:</span>
                      {editMode ? (
                        <input className="border rounded px-2 py-1" value={editAddress.city} onChange={e => setEditAddress({ ...editAddress, city: e.target.value })} />
                      ) : (
                        <span className="text-gray-900">{address.city}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">State:</span>
                      {editMode ? (
                        <input className="border rounded px-2 py-1" value={editAddress.state} onChange={e => setEditAddress({ ...editAddress, state: e.target.value })} />
                      ) : (
                        <span className="text-gray-900">{address.state}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Phone:</span>
                      {editMode ? (
                        <input className="border rounded px-2 py-1" value={editAddress.phone} onChange={e => setEditAddress({ ...editAddress, phone: e.target.value })} />
                      ) : (
                        <span className="text-gray-900">{address.phone}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500">Loading address...</div>
                )}
                {editMode && (
                  <div className="flex gap-2 mt-2">
                    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={async () => {
                      // Cập nhật username và address
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
                    }}>Save</button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-500">Loading user info...</div>
          )}
        </div>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>📦</span> Your Orders
          </h3>
          <OrderContainer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
