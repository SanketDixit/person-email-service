export class PersonEvent {
    personId: string;
    firstName: string;
    lastName: string;
    email: string;
    constructor(personId: string, firstName: string, lastName: string, email: string) {
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
