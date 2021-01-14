import {ScoredUnit} from './ScoredUnit';

export interface StudentToDisplay {
    matricule: string,
    fullname: string,
    section: string,
    bloc: string,
    scores?: ScoredUnit[]
}
