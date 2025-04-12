import { Jumbotron } from '../jumbotron';
import { MainObjectives } from '../main-objectives';
import { Operation } from '../operation';
import { Register } from '../register';

export function LandingPageData() {
  return (
    <>
     <Jumbotron/>
    <MainObjectives/>
    <Operation />
    <Register />
    </>
  );
}
