




export class MobiuszDevice {

  protected _type: string
  protected _id: string
  protected _label: string
  protected _fullLabel: string

  constructor(type: 'input' | 'output', description: {
    deviceId: string,
    kind: string,
    label: string,
    groupId: string
  }) {

    this._type = type
    this._id = description.deviceId
    this._label = description.label.replace(/ *\([^)]*\) */g, '').trim()
    this._fullLabel = description.label

  }

  public unref () {
    //
  }

  /**
   * Transforms the object in a JSON obejct that can be passed through WebSockets
   * @returns An object with values of this device that can be passed to GUI
   */
  public toJSON() {
    return {
      type: this._type,
      id: this._id,
      label: this._label,
      fullLabel: this._fullLabel
    }
  }

  public get type() {
    return this._type
  }

  public get id() {
    return this._id
  }

  public get label() {
    return this._label
  }

  public get fullLabel() {
    return this._fullLabel
  }
  
}