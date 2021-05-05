



export namespace Device {

  export enum Category {
    AV =                          'audiovisual',
    DATA =                        'data',
  }

  export interface Description {
    deviceId: string,
    kind: string,
    label: string,
    groupId?: string,
    options?: any
  }

  export type Type = 'input' | 'output' | 'both'

}