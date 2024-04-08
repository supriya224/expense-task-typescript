import React, { useEffect } from "react";
import logo from "./logo.svg";
import { useAddExpenseModal } from "./hooks/useModel";
import { ModelProvider } from "./providers/ModalProvider";
import { ExpensesList } from "./components/domains/ExpensesList";
import Header from "./components/domains/header";
import Spacer from "./components/atoms/spacer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/loginForm";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/domains/protectedRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="App">
      <Header />
      <Spacer size={20} />
      <ModelProvider />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
