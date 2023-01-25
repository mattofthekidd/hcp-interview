import { Address } from "./address";
import { Company } from "./company";

export interface User {
    address: Address;
    company: Company;
    email: string;
    name: string;
    phone: string;
    website: string;
}