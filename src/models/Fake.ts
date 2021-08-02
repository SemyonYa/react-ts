export class Fake {
    id: string;
    name: string;
    age: string;

    toggle(value: boolean) {
        console.log('value', value);
    }
    constructor() {
        this.id = '';
        this.name = 'name';
        this.age = 'age';
    }
}