export namespace Details {
  export class InitializeDetailsData {
    static readonly type = '[Details] Initialize';

    constructor(public customerId: number) {
    }
  }
}