const path = require('path')
const fs = require('fs')
const glob = require('glob')
const {poi} = require('./_utils')

const distPath = path.resolve(__dirname, 'fixtures/dist')
const scssResourcesPath = path.resolve(__dirname, 'fixtures/common.scss')
const sassResourcesPath = path.resolve(__dirname, 'fixtures/common.sass')

describe('parameter', () => {
  it('should required resources', () => {
    const cmd = poi('index.js', 'miss-resources', `{
    plugins: [require('../../')({})],
  }`)
    expect(cmd.status).toEqual(1)
    expect(cmd.output.toString().includes('Missing required parameter: "resources"')).toBeTruthy()
  })
})

const testBuild = (sass, dist, resources) => {
  const cmd = poi('index.js', dist, `{
    plugins: [require('../../')({
      resources: ${JSON.stringify(resources)},
    })],
    define: {
      SASS: ${JSON.stringify(sass)},
    },
  }`)
  console.log(cmd.stdout.toString())
  console.log(cmd.stderr.toString())
  expect(cmd.status).toEqual(0)
  const [clientCss] = glob.sync(path.resolve(distPath, `${dist}/main.*.css`))
  const cssContent = fs.readFileSync(clientCss).toString()
  expect(cssContent.includes('display:flex')).toBeTruthy()
}

describe('build', () => {
  test('resources scss', () => {
    testBuild(
      false,
      'resources-scss',
      scssResourcesPath
    )
  })

  test('resources scss array', () => {
    testBuild(
      false,
      'resources-scss-array',
      [scssResourcesPath]
    )
  })

  test('resources sass', () => {
    testBuild(
      true,
      'resources-sass',
      sassResourcesPath
    )
  })

  test('resources sass array', () => {
    testBuild(
      true,
      'resources-sass-array',
      [sassResourcesPath]
    )
  })
})
