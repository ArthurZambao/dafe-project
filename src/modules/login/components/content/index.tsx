import { AnimatedContent } from '@/global/animations/animatedContent';
import { LoginForm } from '../login-form';
import { LoginMainTitle } from '../login-main-tittle';

export function LoginData() {
  return (
    <AnimatedContent inverse>
      <div className="bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat px-6 sm:px-0 flex flex-col items-center justify-center min-h-screen z-0">
        <LoginMainTitle />
        <LoginForm />
      </div>
    </AnimatedContent>
  );
}
