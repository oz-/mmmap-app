



export const OSC = {
  Event: {
    // OSC inputs (client)
    INPUT_OPEN:                                       'signal:osc:input:open',
    MESSAGE:                                          'signal:osc:input:message',
    // OSC outputs (servers)
    OUTPUT_OPEN:                                      'signal:osc:output:open',
    EMIT:                                             'signal:osc:output:emit',
    // General
    READY:                                            'signal:osc:ready',
    CLOSE:                                            'signal:osc:close',
    ERROR:                                            'signal:osc:error'
  }
}
