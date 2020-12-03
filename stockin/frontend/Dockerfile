FROM nginx
WORKDIR /usr/app

COPY package.json .
COPY src/ src/
COPY public/ public/
# should have made nginx configuration file to the frontend directory
COPY nginx.conf /etc/nginx/nginx.conf

RUN apt-get update && apt-get install -y nodejs npm gettext-base
RUN npm install --silent
RUN npm run build --prod --silent
RUN mkdir -p /usr/share/nginx/html
RUN cp -r build/* /usr/share/nginx/html/

CMD nginx
