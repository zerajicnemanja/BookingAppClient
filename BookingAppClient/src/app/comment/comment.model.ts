
import { User } from "app/models/user";
import { Accommodation } from "app/models/accommodation";

export class MyComment {

    public Id: number;
    public Text: string;
    /*[Range(1,5), Required]*/
    public Rate: number;
    /*[ForeignKey("Accomodation")]*/
    public Accomodation_Id: number;

}