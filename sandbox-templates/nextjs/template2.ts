Kroni
kronii4969
Idle

funknown — 10/01/23, 18:35
Ok wait I'll delete it there
If you had closed your mouth it would've been fine 🤣
funknown — 10/01/23, 18:43
https://youtube.com/shorts/W3G27XxE3HA?si=EnSIkaIECMiOmarE
YouTube
Apple Music
Fred again.. Sequencing for 60 Seconds #Shorts
Image
Wait for it
It's fucking awesome
Kroni — 11/01/23, 00:06
Mean world syndrome is a hypothesized cognitive bias wherein people may perceive the world to be more dangerous than it actually is, due to long-term moderate to heavy exposure to violence-related content on mass media
funknown — 13/01/23, 17:44
https://open.spotify.com/track/3FThu9nmJg6J0gkMgk7Hv0?si=Jxw72DlVTVe25FvJpzCr1A

funknown — 03/02/23, 23:25
https://open.spotify.com/track/5zNehFOvkThwovAUZsKEFe?si=tB7k73JNQ0--weD-pN8Eog&utm_source=copy-link

funknown — 16/02/23, 02:49
Goodnight
funknown — 23/03/23, 22:26
wthhhhhhhhh
youre playing gta v
funknown — 23/03/23, 22:42
you still at your relatives?
then whats all the background noise?
felt like youre in some house
oh ok
bro install menyoo mods next time its gonna be fun
ohh i can clearly see youve been playing day n night lol
youve completed quite a lotta missions
the radio🗿
😂
type lawyerup in cheat panel
funknown — 23/03/23, 22:51
are you playingm with gamepad???
im not seeing sensitivity control
liek steering?
https://youtu.be/MPn99igIYSk
YouTube
Kx5 - Topic
Unobsidian
Image
Kroni — 23/03/23, 22:58
jpin bck
funknown — 23/03/23, 22:58
stream breaking like shit. thanks to 10mbps clg wifi
u gon recreate 9/11💀
lets say in unison
allaahuak bar
come to class tomorrow
Kroni — 24/03/23, 22:22
jooin
funknown — 25/03/23, 08:24
Uh well i slept off 😳
💀
funknown — 29/03/23, 22:55
oooooh god of war
its lit dude
Kroni — 14/10/24, 01:38
https://discord.gg/bTwD2F7J
Kroni — Yesterday at 23:19
https://discord.gg/9HKNmcqr
Kroni — Yesterday at 23:58
import { Template } from 'e2b'

export const template = new Template()
  .fromImage('node:21-slim')
  .setUser('root')
  .setWorkdir('/')
  .runCmd('apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/')
  .copy('compile_page.sh', '/compile_page.sh')
  .runCmd('chmod +x /compile_page.sh')
  .setWorkdir('/home/user/nextjs-app')
  .runCmd('npx --yes create-next-app@16.0.5 . --yes')
  .runCmd('npx --yes shadcn@2.6.3 init --yes -b neutral --force')
  .runCmd('npx --yes shadcn@2.6.3 add --all --yes')
  .runCmd('mv /home/user/nextjs-app/ /home/user/ && rm -rf /home/user/nextjs-app')
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
Kroni — 00:06
RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force
import { Template } from 'e2b'

export const template = Template()
  .fromImage('node:21-slim')
  .setUser('root')
  .setWorkdir('/')
  .runCmd('apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/')
  .copy('compile_page.sh', '/compile_page.sh')
  .runCmd('chmod +x /compile_page.sh')
  .setWorkdir('/home/user/nextjs-app')
  .runCmd('npx --yes create-next-app@16.0.5 . --yes')
  .runCmd('npx --yes shadcn@2.6.3 init --yes -b neutral --force')
  .runCmd('npx --yes shadcn@2.6.3 add --all --yes')
  .runCmd('mv /home/user/nextjs-app/ /home/user/ && rm -rf /home/user/nextjs-app')
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
funknown — 00:26
e2b sandbox logs -f ioobody4xxpygdepcgura
ioobody4xxpygdepcgura
Kroni — 00:27
e2b sandbox logs -f ioobody4xxpygdepcgura

Logs for sandbox ioobody4xxpygdepcgura:

[2025-12-02 18:50:07.676Z] INFO  { buildID: 'unknown', category: 'default', command: '/bin/bash -l -c #!/bin/bash\nexport BASH_XTRACEFD=1\nset -euo pipefail\n\necho "Starting configuration script"\n\ncat <<EOF > /.e2b\nENV_ID=wvh09sdnte56p4ziz9ou\nTEMPLATE_ID=wvh09sdnte56p4ziz9ou\nBUILD_ID=57c95730-fcc8-4c7c-a60e-5742632c7385\nEOF\n\necho "Enable swap"\necho 0 > /proc/sys/vm/swappiness\nswapon /swap/swapfile\n\n# Create default user.\n# if the /home/user directory exists, we copy the skeleton files to it because the adduser command\n# will ignore the directory if it exists, but we want to include the skeleton files in the home directory\n# in our case.\necho "Create default user \'user\' (if doesn\'t exist yet)"\nADDUSER_OUTPUT=$(adduser -disabled-password --gecos "" user 2>&1 || true)\necho "$ADDUSER_OUTPUT"\nif echo "$ADDUSER_OUTPUT" | grep -q "The home directory \\`/home/user\' already exists"; then\n    # Copy skeleton files if they don\'t exist in the home directory\n    echo "Copy skeleton files to /home/user"\n    cp -rn /etc/skel/. /home/user/\nfi\n\necho "Add sudo to \'user\' with no password"\nusermod -aG sudo user\npasswd -d user\necho "user ALL=(ALL:ALL) NOPASSWD: ALL" >>/etc/sudoers\n\necho "Give \'user\' ownership to /home/user"\nmkdir -p /home/user\nchown -R user:user /home/user\n\necho "Give 777 permission to /usr/local"\nchmod 777 -R /usr/local\n\necho "Create /code directory"\nmkdir -p /code\necho "Give 777 permission to /code"\nchmod 777 -R /code\n\necho "Finished configuration script"\n', event_type: 'process_start', logger: 'process', message: 'Process with pid 382 started', operation_id: '2', pid: 382 }
[2025-12-02 18:50:07.944Z] INFO  { buildID: 'unknown', category: 'default', data: "Starting configuration script\nEnable swap\nCreate default user 'user' (if doesn't exist yet)\nadduser: The user `user' already exists.\nAdd sudo to 'user' with no password\npasswd: password changed.\nGive 'user' ownership to /home/user\nGive 777 permission to /usr/local\nCreate /code directory\nGive 777 permission to /code\nFinished configuration script\n", event_type: 'stdout', logger: 'process', message: 'Streaming process event (flush)', operation_id: '2' }
Expand
message.txt
13 KB
funknown — 00:32
import dotenv from "dotenv";
dotenv.config({ path: "C:/Users/akshay/Downloads/Akira_Saas-E2b/Akira_Saas-E2b/.env" });

import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'
Expand
build.prod.ts
1 KB
import dotenv from "dotenv";
dotenv.config({ path: "C:/Users/akshay/Downloads/Akira_Saas-E2b/Akira_Saas-E2b/.env" });

import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'
Expand
build.dev.ts
1 KB
funknown — 00:46
import { Template } from 'e2b'

export const template = Template()
  .fromImage('node:18-slim')
  
  .setUser('root')
Expand
template.ts
1 KB
Kroni — 00:51
https://hub.docker.com/_/node
node - Official Image | Docker Hub
Node.js is a JavaScript-based platform for server-side and networking applications.
funknown — 01:11
PS C:\Users\akshay\Downloads\Akira_Saas-E2b\Akira_Saas-E2b\sandbox-templates\nextjs> npx tsx build.dev.ts
[dotenv@17.2.3] injecting env (6) from ..\..\.env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
0.0s  | 12:42:56 am INFO  Requesting build for template: 13
1.0s  | 12:42:57 am INFO  Template created with ID: u5s3914yz1zy1qml9c3i, Build ID: d21caf07-68e4-4d16-8b1e-5169798af4a5
1.3s  | 12:42:57 am INFO  Skipping upload of 'compile_page.sh', already cached
1.3s  | 12:42:57 am INFO  All file uploads completed
Expand
message.txt
6 KB
PS C:\Users\akshay\Downloads\Akira_Saas-E2b\Akira_Saas-E2b\sandbox-templates\nextjs> npx tsx build.prod.ts
[dotenv@17.2.3] injecting env (6) from ..\..\.env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
0.0s  | 12:44:20 am INFO  Requesting build for template: 13
1.0s  | 12:44:21 am INFO  Template created with ID: u5s3914yz1zy1qml9c3i, Build ID: 254b0dc6-1859-427f-a75b-743e9c69a201
1.4s  | 12:44:22 am INFO  Skipping upload of 'compile_page.sh', already cached
1.4s  | 12:44:22 am INFO  All file uploads completed
Expand
message.txt
5 KB
funknown — 01:35
import { Template } from 'e2b'

export const template = Template()
  .fromImage('node:18-slim')
  
  .setUser('root')
  .setWorkdir('/')
  .runCmd('apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*')
  
  .copy('compile_page.sh', '/compile_page.sh')
  .runCmd('chmod +x /compile_page.sh')
  
  .setWorkdir('/home/user')
  
  // 1. FIX: Name the temp folder 'temp-app' (NOT 'app')
  .runCmd('NODE_OPTIONS="--max-old-space-size=4096" npx --yes create-next-app@14 temp-app --ts --tailwind --eslint --app --no-src-dir --no-import-alias --use-npm')
  
  // 2. Adjust Shadcn to look at 'temp-app'
  .setWorkdir('/home/user/temp-app')
  .runCmd('npx --yes shadcn@latest init --defaults --force --yes')
  .runCmd('npx --yes shadcn@latest add --all --yes --overwrite')
  
  // 3. Move files out
  .setWorkdir('/home/user')
  .runCmd('cp -r /home/user/temp-app/. /home/user/')
  
  // 4. FIX: Delete 'temp-app'. This is safe because your source code is now in a folder named 'app', which is different.
  .runCmd('rm -rf /home/user/temp-app')
  .runCmd('chown -R user:user /home/user')
  
  .setUser('user')
  .setWorkdir('/home/user')
  
  .setEnvs({
    HOST: '0.0.0.0',
    PORT: '3000',
  })
  
  .setStartCmd('npm run dev -- --hostname 0.0.0.0 --port 3000')
Collapse
template.ts
2 KB
﻿
funknown
funknown
 