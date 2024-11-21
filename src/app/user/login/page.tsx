import LoginForm from "./components/login-form";

export const metadata = {
  title: "Welcome - 91.2 Crooze FM",
  description:
    "Create an account to start croozing! Or login to your existing account to continue. You will be able to download the available recordings on this site.",
};

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen container mx-auto py-12 bg-[url('/assets/cfm_studios_blurred.png')] bg-cover bg-center bg-no-repeat">
      <LoginForm />
    </div>
  );
}
