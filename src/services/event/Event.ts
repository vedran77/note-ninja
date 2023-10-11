import { IEvent } from "./IEvent";

abstract class Event implements IEvent {
    protected readonly _name: string = "";

    public handle(...args: any): void { }

    public eventName(): string {
        return this._name;
    }
}

export { Event };