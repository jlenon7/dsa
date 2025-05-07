import { Runner } from '@athenna/test'

await Runner.setTsEnv()
  .addAssertPlugin()
  .addPath('tests/unit/**/*_test.ts')
  .setCliArgs(process.argv.slice(2))
  .setGlobalTimeout(5000)
  .run()
