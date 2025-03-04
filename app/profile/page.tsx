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
  useEffect(() => {
    if (!user) {
      router.push("./");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "items"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr: TodoItem[] = [];
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id } as TodoItem);
        });
        setItems(itemsArr);
      });

      return () => unsubscribe();
    }
  }, [user]);

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
    <div className="p-3 xs:p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="text-white space-y-4">
        {/* Task Input Section */}
        <div className="bg-slate-400 p-3 xs:p-4 sm:p-6 rounded-lg">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-black font-serif text-center">
            Add Your Tasks
          </h2>

          <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
            {/* Task Name Input */}
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-white p-2 xs:p-3 text-black rounded-lg w-full text-sm xs:text-base"
              placeholder="Enter Task"
              type="text"
            />

            {/* Time Input */}
            <input
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="bg-white p-2 xs:p-3 text-black rounded-lg w-full text-sm xs:text-base"
              placeholder="Select date and time"
              type="datetime-local"
            />

            {/* Status Buttons */}
            <div className="flex flex-wrap justify-center gap-2 xs:gap-3">
              {["Urgent", "Important", "Ignorable"].map((status) => (
                <button
                  key={status}
                  onClick={() => chooseOption(status)}
                  className={`w-full xs:w-auto px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs xs:text-sm transition ${
                    selectedStatus === status
                      ? "bg-gray-600 text-gray-400"
                      : status === "Urgent"
                      ? "bg-red-600 text-white hover:bg-red-500"
                      : status === "Important"
                      ? "bg-yellow-400 text-white hover:bg-yellow-300"
                      : "bg-sky-600 text-white hover:bg-sky-500"
                  }`}
                >
                  {status}
                </button>
              ))}

              {/* Add Task Button */}
              <button
                onClick={addItem}
                className="w-full xs:w-auto bg-slate-600 text-white px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs xs:text-sm hover:bg-slate-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-slate-400 p-3 xs:p-4 sm:p-6 rounded-lg">
          <div className="hidden sm:flex justify-evenly text-base sm:text-xl lg:text-2xl font-bold font-serif mb-4">
            <h2>Task</h2> | <h2>Time</h2> | <h3>Status</h3>
          </div>

          {items.length === 0 ? (
            <div className="text-center p-3 text-black text-base sm:text-xl">
              No tasks yet. Add a task to get started!
            </div>
          ) : (
            items.map((item) => {
              const statusClasses = {
                Urgent: "bg-red-600 text-white",
                Important: "bg-yellow-400 text-white",
                Ignorable: "bg-sky-500 text-white",
              };

              return (
                <div
                  key={item.id}
                  className="bg-slate-600 rounded-lg p-3 xs:p-4 mb-2 xs:mb-3"
                >
                  {/* Mobile View */}
                  <div className="sm:hidden">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-bold capitalize">
                        {item.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          statusClasses[
                            item.status as keyof typeof statusClasses
                          ] || "bg-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        {formatDateTime(item.time)}
                      </span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-lime-500 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:flex justify-between items-center">
                    <span className="w-1/3 text-base sm:text-xl lg:text-2xl capitalize">
                      {item.name}
                    </span>
                    <span className="w-1/3 text-center text-sm sm:text-base lg:text-xl text-black font-bold">
                      {formatDateTime(item.time)}
                    </span>
                    <span
                      className={`w-1/3 text-center px-2 py-1 rounded text-xs sm:text-sm ${
                        statusClasses[
                          item.status as keyof typeof statusClasses
                        ] || "bg-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-lime-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-500"
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
  );
}
