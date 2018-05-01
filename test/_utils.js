const {spawnSync} = require('child_process')
const path = require('path')

exports.poi = (source, target, options = '{}', env = 'production') => {
  const node = process.argv[0]
  const poi = path.resolve('node_modules/.bin/poi')
  source = path.resolve(__dirname, `fixtures/${source}`)
  target = path.resolve(__dirname, `fixtures/dist/${target}`)
  const args = [poi, 'build', '--out-dir', target, source]
  const cmd = spawnSync(node, args, {
    cwd: path.resolve(__dirname, 'fixtures'),
    env: {
      NODE_ENV: env,
      POI_OPTIONS: options,
    },
  })
  if (cmd.status !== 0) {
    console.log('STDOUT')
    console.log(cmd.stdout.toString())
    console.log('STDERR')
    console.log(cmd.stderr.toString())
  }
  return cmd
}
