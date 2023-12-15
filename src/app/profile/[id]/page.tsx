export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col bg-gray-600 items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl m-2 ">Profile</h1>
      <hr />
      <p className="text-4xl">Profile page</p>
      <span className="text-3xl m-1 rounded-lg p-2 ml-2 bg-white text-black">
        {params.id}
      </span>
    </div>
  );
}
