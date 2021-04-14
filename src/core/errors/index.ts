




export class AppInitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppInitError'
  }
}

export class WorkerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WorkerError'
  }
}

export class WorkerMessageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WorkerMessageError'
  }
}

export class UpdaterError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UpdaterError'
  }
}