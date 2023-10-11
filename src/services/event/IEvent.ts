interface IEvent {
    eventName(): string;
    handle(...args: any): void;
}

export { IEvent };
