import { Template } from 'e2b'

export const template = Template()
  .fromImage('node:21-slim')
  .setUser('root')
  .setWorkdir('/')
  .runCmd('apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*')
  .copy('compile_page.sh', '/compile_page.sh')
  .runCmd('chmod +x /compile_page.sh')
  .setWorkdir('/home/user/nextjs-app')
  .runCmd('npx --yes create-next-app@16.0.5 . --yes --skip-install')
  .runCmd('mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app')
  .setWorkdir('/home/user')
  .runCmd('NODE_OPTIONS=--max-old-space-size=1024 npm install')
  .setEnvs({
    'HOST': '0.0.0.0',
  })
  .setEnvs({
    'PORT': '3000',
  })
  .setWorkdir('/home/user')
  .setUser('user')
  .setWorkdir('/home/user')
  .setStartCmd('sudo npm run dev -- -H 0.0.0.0 -p 3000', 'sleep 20')
