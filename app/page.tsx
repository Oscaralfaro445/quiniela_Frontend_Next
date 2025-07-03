import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  console.log(authToken);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}

{
  /* <Alert
  type={alertState.type}
  title={alertState.title}
  description={alertState.description}
  isModalOpen={alertState.isModalOpen}
  toggleAlert={() => setAlertState((prev) => ({ ...prev, isModalOpen: false }))}
/>;

const [alertState, setAlertState] = useState({
  type: AlertState.ERROR,
  title: "",
  description: "",
  isModalOpen: false,
}); */
}
