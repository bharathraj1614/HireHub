import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log("err", error.message);

  return (
    <div className="flex justify-between items-center h-screen flex-col gap-6 text-5xl">
      <div className="flex justify-center items-center flex-col p-60 gap-6">
        <h1>Something went wrong 😢</h1>
        <p className="text-3xl">{error.message || error.data}</p>
        <Link
          className="text-3xl text-blue-500 hover:text-blue-600 hover:underline"
          to="/"
        >
          ↻ Refresh
        </Link>
      </div>
      <div className="h-12 bg-blue-600 w-full"></div>
    </div>
  );
}

export default Error;
