// Function execution flow

const { kos = require('..') } = global

module.exports = kos
  .reactor('function', "Provides dynamic function exeuction transforms via messages")
  .in('caller').bind(exec) // optional, but should be sent BEFORE arguments
  .in('arguments').out('return').use('function').bind(exec)
  
function exec(args) {
  if (this.trigger === 'caller') return this.set('caller', args)

  let f = this.fetch('function')
  let ctx = this.get('caller')
  try { this.send('return', f.apply(ctx, args)) }
  catch (e) { this.throw(e) }
}