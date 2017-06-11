export class Place {
    constructor() {
    }
    public Id: number;
    /*[StringLength(30)]*/
    public Name: string;
    /*[ForeignKey("Region")]*/
    public Region_Id: number;
}