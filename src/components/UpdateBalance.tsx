import React, { useState } from "react";
import api from "../utils/api";

export default function UpdateBalance() {
  const [newBalance, setNewBalance] = useState<number | "">("");
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);

  const fetchCurrentBalance = async () => {
    try {
      const response = await api.get("/api/dashboard");
      setCurrentBalance(response.data.data.balance.balance);
    } catch (error) {
      console.error("Error fetching current balance:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(localStorage.getItem("jwtToken"));
      const response = await api.put("/api/update-balance", {
        update_balance: newBalance,
      });
      if (response.data.success) {
        alert("Balance updated successfully!");
        fetchCurrentBalance();
      } else {
        alert("Failed to update balance. Please try again.");
      }
    } catch (error) {
      const err = error as any;
      console.error("Error updating balance:", err);
      alert("An error occurred while updating the balance. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={fetchCurrentBalance}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Fetch Current Balance
      </button>
      {currentBalance !== null && (
        <p className="mb-4">
          <strong>Current Balance:</strong> ${currentBalance.toFixed(2)}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="New Balance"
          value={newBalance}
          onChange={(e) => setNewBalance(Number(e.target.value))}
          className="w-full p-2 border rounded text-black"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Update Balance
        </button>
      </form>
    </div>
  );
}
