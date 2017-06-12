import { Country } from '../country/country.model';

export class Region {
    constructor() {
    }
    public Id: number;
    /*[StringLength(30)]*/
    public Name: string;
    /*[ForeignKey("Country")]*/
    public Country_Id: number;

    public Country: Country;
}