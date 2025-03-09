import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth_options";



const HomePage = async () => {
  const session = await getServerSession(authOptions);

  const first_name = session?.user.first_name;
  const last_name = session?.user.last_name;

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-primaryGreen">
        Welcom {first_name} {last_name} to ConnectIn
      </h1>
      
    </div>
  );
};

export default HomePage;
