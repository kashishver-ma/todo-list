"use client";

import { useState, useEffect } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  onSnapshot,
  doc,
  where,
  DocumentData,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

// Interfaces remain the same
interface TodoItem extends DocumentData {
  id: string;
  name: string;
  time: string;
  status: string;
  userId: string;
  createdAt?: string;
}

interface NewItem {
  name: string;
  time: string;
  status: string;
}

export default function Profile() {
  const { user, logOut } = UserAuth();
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    time: "",
    status: "",
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  // Previous useEffect hooks remain the same

  const chooseOption = (status: string) => {
    setNewItem((prev) => ({ ...prev, status }));
    setSelectedStatus(status);
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newItem.name !== "" &&
      newItem.time !== "" &&
      newItem.status !== "" &&
      user
    ) {
      try {
        await addDoc(collection(db, "items"), {
          name: newItem.name.trim(),
          time: newItem.time,
          status: newItem.status,
          userId: user.uid,
          createdAt: new Date().toISOString(),
        });
        setNewItem({ name: "", status: "", time: "" });
        setSelectedStatus("");
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "items", id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  const formatDateTime = (dateTime: string): string => {
    return dateTime.replace("T", " ");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <div className="text-white">
        <div className="bg-slate-400 p-4 rounded-lg">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black font-serif text-center">
            Add Your Tasks
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-6 justify-center">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-white p-3 text-black rounded-lg w-full md:w-[580px]"
              placeholder="Enter Task"
              type="text"
            />
            <input
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="bg-white p-3 text-black rounded-lg w-full md:w-96"
              placeholder="Select date and time"
              type="datetime-local"
            />
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              <button
                onClick={() => chooseOption("Urgent")}
                className={`p-2 md:p-3 rounded-lg hover:shadow-xl hover:shadow-gray-500 w-full md:w-28 transition ${
                  selectedStatus === "Urgent"
                    ? "bg-gray-600 text-gray-400"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                Urgent
              </button>
              <button
                onClick={() => chooseOption("Important")}
                className={`p-2 md:p-3 rounded-lg hover:shadow-xl hover:shadow-gray-500 w-full md:w-28 transition ${
                  selectedStatus === "Important"
                    ? "bg-gray-600 text-gray-400"
                    : "bg-yellow-400 text-white hover:bg-yellow-300"
                }`}
              >
                Important
              </button>
              <button
                onClick={() => chooseOption("Ignorable")}
                className={`p-2 md:p-3 rounded-lg w-full md:w-28 hover:shadow-xl hover:shadow-gray-500 transition ${
                  selectedStatus === "Ignorable"
                    ? "bg-gray-600 text-gray-400"
                    : "bg-sky-600 text-white hover:bg-sky-500"
                }`}
              >
                Ignorable
              </button>
              <button
                type="submit"
                onClick={addItem}
                className="bg-slate-600 text-white hover:bg-slate-700 transition w-full md:w-28 p-2 md:p-3 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-400 mt-6 p-4 rounded-lg">
          <div>
            <div className="flex justify-evenly text-xl md:text-2xl font-bold font-serif">
              <h2>Task</h2> | <h2>Time</h2> | <h3>Status</h3>
            </div>
            {items.length === 0 ? (
              <div className="text-center mt-8 p-4 text-black text-xl">
                No tasks yet. Add a task to get started!
              </div>
            ) : (
              items.map((item, index) => {
                let statusClass = "";
                switch (item.status) {
                  case "Urgent":
                    statusClass = "bg-red-600 text-white";
                    break;
                  case "Important":
                    statusClass = "bg-yellow-400 text-white";
                    break;
                  case "Ignorable":
                    statusClass = "bg-sky-500 text-white";
                    break;
                  default:
                    statusClass = "bg-gray-500 text-white";
                    break;
                }
                return (
                  <div
                    key={index}
                    className="mt-8 p-3 text-white bg-slate-600 flex flex-col md:flex-row justify-between items-center rounded-lg font-sans"
                  >
                    <div className="flex flex-col md:flex-row justify-between w-full items-center text-center md:text-left">
                      <span className="capitalize text-xl md:text-3xl mb-2 md:mb-0 md:w-2/3">
                        {item.name}
                      </span>

                      <span className="text-base md:text-2xl mb-2 md:mb-0 font-bold text-black hover:scale-110 md:w-1/3 md:text-center">
                        {formatDateTime(item.time)}
                      </span>
                      <span
                        className={`p-2 animate-custom-pulse rounded-lg h-10 mb-2 md:mb-0 w-full md:w-1/3 text-center justify-center ${statusClass} text-sm md:text-base`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 text-white rounded-lg bg-lime-500 hover:bg-red-500 hover:rounded-lg hover:scale-110 transition hover:cursor-pointer"
                      >
                        Delete/Complete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
