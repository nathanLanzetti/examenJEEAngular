import {Unit} from './Unit';

export interface ScoredUnit{
  unit?: Unit;
  score: number | 'PR' | 'PP' | 'D' | 'Z' | 'DV';
  validated: boolean;
}
