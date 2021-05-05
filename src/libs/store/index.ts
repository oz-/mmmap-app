import Store from 'electron-store'





export class MobiuszStore {

  private _store: Store | null

  constructor(name: string) {

    this._store = new Store({
      name
    })

  }

  public unref() {
    this._store = null
  }

  public set(object: any) {
    console.log('IN SET')
    this._store!.set(object)
  }

  public get(entry: string) {
    return this._store!.get(entry)
  }

  public setAll(object: any) {
    this._store!.store = object
  }

  public getAll() {
    return this._store!.store
  }

}