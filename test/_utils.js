const {spawnSync} = require('child_process')
const path = require('path')

exports.poi = (source, target, options = {}, env = 'production') => {
  const node = process.argv[0]
  const poi = path.resolve('node_modules/.bin/poi')
  source = path.resolve(__dirname, `fixtures/${source}`)
  target = path.resolve(__dirname, `fixtures/dist/${target}`)
  const args = [poi, 'build', '--out-dir', target, source]
  const cmd = spawnSync(node, args, {
    cwd: path.resolve(__dirname, 'fixtures'),
    env: {
      NODE_ENV: env,
      POI_OPTIONS: JSON.stringify(options),
    },
  })
  if (cmd.status !== 0) {
    console.log(cmd.output.toString())
  }
  return cmd
}
