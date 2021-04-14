export namespace Core {
  export interface Module {
    name: string;
    // TODO: signature of the method.
    init: any;
    unref: any;
  }
}