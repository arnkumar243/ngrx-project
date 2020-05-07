export class User {
    constructor(public email: string, private token: string, public userId: string, private expiresIn: number) {}

    get _token() {
        if (new Date().getTime() < this.expiresIn) {
            return this.token;
        }
        return null;
    }
}
