import { AnimatedContent } from '@/global/animations/animatedContent';
import { Jumbotron } from '../jumbotron';
import { MainObjectives } from '../main-objectives';
import { Operation } from '../operation';
import { Register } from '../register';
import { Definition } from '../definition';

export function LandingPageData() {
  console.log('Rendendo no:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');
  return (
    <AnimatedContent inverse>
      <Jumbotron />
      <MainObjectives />
      <Definition />
      <Operation />
      <Register />
    </AnimatedContent>
  );
}
