"use client";
export default function Home() {
  async function getAllBooks() {
    const response = await fetch("/api/getAllBooks");
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <button
        onClick={() => {
          getAllBooks();
        }}
      >
        Get All books
      </button>
    </div>
  );
}
