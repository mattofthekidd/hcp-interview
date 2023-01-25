import { Coords } from "./coords";

export interface Address {
    city: string;
    geo: Coords;
    street: string;
    suite: string;
    zipcode: string;
}

