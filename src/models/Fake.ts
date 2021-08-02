export class Fake {
    id: string;
    name: string;
    age: number;

    toggle(value: boolean) {
        console.log('value', value);
    }
    constructor(id: string = null, name: string = null, age: number = null) {
        this.id = id ?? 'XXX';
        this.name = name ?? 'Default name';
        this.age = age ?? 18;
    }
}