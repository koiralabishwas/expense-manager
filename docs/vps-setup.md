### get inside bvps

`ssh root@<YOUR_VPS_IP>`

### Update and Install Essentials (Docker, Nginx, Certbot):

```
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx
```

### Start Docker:

```
sudo systemctl enable --now docker
```

### Phase 2: Project Setup

Clone your Repository: Navigate to the web directory and clone your repo.

```
cd /var/www
git clone https://github.com/koiralabishwas/expense-manager.git
cd expense-manager
```

then manage the .env files
Add any secrets your Next.js app needs (like NEXTAUTH_SECRET if you use Auth.js). Note: You do NOT need to add MONGODB_URI here because your docker-compose file already handles that in the environment section.

```
nano .env
```

Create the Docker Volume:

```
docker volume create expense-manager_expense-manager
```

### Phase 3: Deploy with Docker

use make command

check docker status
You should see frontend running on port 3000.
You should see mongodb running on port 27017.

```
docker ps
```

### Phase 4: Nginx Reverse Proxy

Now we expose the container (running on localhost:3000) to the public internet on port 80/443.
Create Nginx Config:

```
sudo nano /etc/nginx/sites-available/kakei.koirala.jp
```

Paste Configuration:
Nginx

```
server {
    server_name kakei.koirala.jp;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Forward IP info
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/kakei.koirala.jp/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/kakei.koirala.jp/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = kakei.koirala.jp) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;
    server_name kakei.koirala.jp;
    return 404; # managed by Certbot

}
```

Enable and Test:

```
sudo ln -s /etc/nginx/sites-available/kakei.koirala.jp /etc/nginx/sites-enabled/
sudo nginx -t
```

### If the test says "ok", restart Nginx:
```
sudo systemctl restart nginx
```
### Phase 5: SSL (HTTPS) Setup
Secure the site with a free Let's Encrypt certificate.

Run Certbot:

```
sudo certbot --nginx -d kakei.koirala.jp
```
Enter your email when asked.

Agree to terms (Y).

If asked to redirect HTTP to HTTPS, choose "2: Redirect".
