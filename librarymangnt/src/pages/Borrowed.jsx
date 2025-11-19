import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import BorrowedBooksItem from "../components/ListOfBorrowedBooks";
import api from "../components/Api.jsx";

const Borrowed = () => {
  const [listOfBorrowedBooks, setListOfBorrowedBooks] = useState([]);
  const { user } = useAuth();
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`${backendURL}/user/borrowed/books`, {
          withCredentials: true,
        });

        setListOfBorrowedBooks(response.data.borrowedBooks);
        // console.log("borrowed books", response.data.borrowedBooks);
      } catch (error) {
        console.log("error fetching borrowed books", error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  return (
    <div className="min-h-screen p-10 mt-14 md:mt-20 ">
      <h1 className="text-black text-3xl  mb-6 text-center">
        Your Borrowed Books
      </h1>
      <div>
        {listOfBorrowedBooks.length === 0 ? (
          <p>You have not borrowed any books.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {listOfBorrowedBooks.map((item) => (
              <BorrowedBooksItem key={item._id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Borrowed;
