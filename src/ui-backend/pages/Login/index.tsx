import { LoginPage } from "./login-page";

export function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[4fr_1fr]">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://www.dmoe.cc/random.php"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginPage />
        </div>
      </div>
    </div>
  );
}
