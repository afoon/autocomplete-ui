export type Address ={
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  }
  type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
  }
export interface ResponseUser {
      id: number;
      name: string;
      username?: string;
      email: string;
      address: Address;
      phone?: string;
      website?: string;
      company?: Company
  } 
export type User = Omit<ResponseUser, 'name'> & {
  name: NameOptions;
  };
export type NameOptions = {
  title?: string;
  firstName: string;
  lastName: string;
}