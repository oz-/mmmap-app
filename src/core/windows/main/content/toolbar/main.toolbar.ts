import { GlobalEvent } from '@/gui/events/global'
import { MainWindow } from '../../messages'

const whiteboardButton = {
  icon: 'draw',
  label: 'Whiteboard',
  rounded: true,
  name: 'mmmap:toolbar:main:whiteboard',
  onDown(target: any, button: any) {
    GlobalEvent.$emit(MainWindow.Event.TAB_OPEN, 'mmmap:tab:whiteboard')
  }
}

const sidebarButton = {
  icon: 'view_sidebar',
  label: 'Show / Hide Sidebar',
  rounded: true,
  type: 'toggle',
  toggle: 'primary',
  toggled: true,
  name: 'vuoz:toolbar:main:sidebar',
  onDown(target: any, button: any) {
    console.warn('SHOW / HIDE SIDEBAR')
  }
}

const spacer = {
  role: 'spacer'
}

export const mainToolbarItems = [
  whiteboardButton,
  spacer,
  sidebarButton
]