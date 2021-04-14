// see https://www.electronjs.org/docs/api/app

export namespace App {
  /**
   * Application events.
   */
  export enum Event {
    // App
    WINDOW_ALL_CLOSED =                 'window-all-closed',
    ACTIVATE =                          'activate',
    READY =                             'ready',
    WILL_FINISH_LAUNCHING =             'will-finish-launching',
    BEFORE_QUIT =                       'before-quit',
    WILL_QUIT =                         'will-quit',
    QUIT =                              'quit',
    OPEN_FILE =                         'open-file',
    OPEN_URL =                          'open-url',
    DID_BECOME_ACTIVE =                 'did-become-active',
    CONTINUE_ACTIVITY =                 'continue-activity',
    WILL_CONTINUE_ACTIVITY =            'will-continue-activity',
    CONTINUE_ACTIVITY_ERROR =           'continue-activity-error',
    ACTIVITY_WAS_CONTINUED =            'activity-was-continued',
    UPDATE_ACTIVITY_STATE =             'update-activity-state',
    NEW_WINDOW_FOR_TAB =                'new-window-for-tab',
    BROWSER_WINDOW_BLUR =               'browser-window-blur',
    BROWSER_WINDOW_FOCUS =              'browser-window-focus',
    BROWSER_WINDOW_CREATED =            'browser-window-created',
    WEB_CONTENTS_CREATED =              'web-contents-created',
    CERTIFICATE_ERROR =                 'certificate-error',
    SELECT_CLIENT_CERTIFICATE =         'select-client-certificate',
    LOGIN =                             'login',
    GPU_INFO_UPDATE =                   'gpu-info-update',
    RENDER_PROCESS_GONE =               'render-process-gone',
    CHILD_PROCESS_GONE =                'child-process-gone',
    ACCESSIBILITY_SUPPORT_CHANGED =     'accessibility-support-changed',
    SESSION_CREATED =                   'session-created',
    SECOND_INSTANCE =                   'second-instance',
    DESKTOP_CAPTURER_GET_SOURCES =      'desktop-capturer-get-sources',
    REMOTE_REQUIRE =                    'remote-require',
    REMOTE_GET_GLOBAL =                 'remote-get-global',
    REMOTE_GET_BUILTIN =                'remote-get-builtin',
    REMOTE_GET_CURRENT_WINDOW =         'remote-get-current-window',
    REMOTE_GET_CURRENT_WEB_CONTENTS =   'remote-get-current-web-contents',
  }

  export enum Power {
    // Power monitor
    SUSPEND =                           'suspend',
    RESUME =                            'resume',
    SHUTDOWN =                          'shutdown',
    LOCK_SCREEN =                       'lock-screen',
    UNLOCK_SCREEN =                     'unlock-screen',
  }

  export enum State {
    PREROLL =                           'preroll'
  }
}

