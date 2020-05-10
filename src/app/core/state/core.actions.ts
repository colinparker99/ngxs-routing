export namespace Core {
  export class InitializeCoreData {
    static readonly type = '[Core] Initialize';

    constructor(public customerId: number) {
    }
  }
}