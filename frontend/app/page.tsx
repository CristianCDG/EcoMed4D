import { SignupFormDemo } from "@/components/SignUpForm";
import { SignInFormDemo } from "@/components/SignInForm";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <main>
      <div className="max-w-7xl w-full">
        <Hero />
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <SignupFormDemo />
        </div>
      </div>
      {/* <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center">
        <SignInFormDemo />
      </div> */}
    </main>
  );
}