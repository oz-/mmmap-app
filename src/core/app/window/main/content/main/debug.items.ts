const cropButton = {
  icon: 'crop',
  label: 'Crop',
  type: 'toggle',
  toggle: 'primary',
  rounded: true,
  name: 'vuoz:toolbar:crop',
  target: 'MyAwesomeComponent',
  onDown(target: any, button: any) {
    // Here 'this' represents the caller (VuozInnerToolbar)
    console.log('Caller', this)
    console.log('Select \'crop\' to target', target)
    console.log('Button called', button);
    // Disables the toolbar's button except this one.
    (this as any).disableAllBut('vuoz:toolbar:crop')
  },
  onUp(target: any, button: any) {
    console.log('Caller', this)
    console.log('Deselect \'crop\' to target', target)
    console.log('Button called', button);
    // Resets toolbar's state.
    (this as any).resetState()
  }
}

const redimButton = {
  icon: 'aspect_ratio',
  label: 'Resize',
  rounded: true,
  name: 'vuoz:toolbar:resize',
  target: 'MyAwesomeComponent',
  onDown(target: any, button: any) {
    console.log('Caller', this)
    console.log('Select \'resize\' to target', target)
    console.log('Button called', button);
    (this as any).disable('vuoz:toolbar:resize')
  },
  onUp(target: any, button: any) {
    console.log('Caller', this)
    console.log('Deselect \'resize\' to target', target)
    console.log('Button called', button)
  }
}

const rotateRightButton = {
  icon: 'rotate_right',
  label: 'Rotate right',
  rounded: true,
  name: 'vuoz:toolbar:rotate:right',
  target: 'MyAwesomeComponent',
  onUp(target: any, button: any) {
    console.log('Caller', this)
    console.log('Rotate right on mouse up to target', target)
    console.log('Button called', button)
  }
}

const rotateLeftButton = {
  icon: 'rotate_left',
  label: 'Rotate left',
  rounded: true,
  name: 'vuoz:toolbar:rotate:left',
  target: 'MyAwesomeComponent',
  onDown(target: any, button: any) {
    console.log('Caller', this)
    console.log('Rotate left on mouse down to target', target)
    console.log('Button called', button)
  }
}

const saveButton = {
  icon: 'view_sidebar',
  label: 'Save',
  rounded: true,
  type: 'toggle',
  toggle: 'primary',
  toggled: true,
  name: 'vuoz:toolbar:save',
  target: 'MyAwesomeComponent',
  onDown(target: any, button: any) {
    console.log('Caller', this)
    console.log('Save on mouse down to target', target)
    console.log('Button called', button)
  }
}

const spacer = {
  role: 'spacer'
}

export const debugItems = [
  cropButton,
  redimButton,
  spacer,
  rotateRightButton,
  rotateLeftButton,
  spacer,
  saveButton
]