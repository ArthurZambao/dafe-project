import { AnimatedContent } from '@/global/animations/animatedContent';
import { Jumbotron } from '../jumbotron';
import { MainObjectives } from '../main-objectives';
import { Operation } from '../operation';
import { Register } from '../register';

export function LandingPageData() {
  return (
    <AnimatedContent inverse>
      <Jumbotron />
      <MainObjectives />
      <Operation />
      <Register />
    </AnimatedContent>
  );
}
