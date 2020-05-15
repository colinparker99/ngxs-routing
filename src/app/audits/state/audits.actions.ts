export namespace Audits {
    export class InitializeAuditsData {
      static readonly type = '[Audits] Initialize';
  
      constructor(public customerId: number) {
      }
    }
  }