FROM node:18


RUN apt-get update && \
    apt-get install -y \
    alsa-lib \
    atk \
    cups-libs \
    ipa-gothic-fonts \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxi6 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    libpango-1.0-0 \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-misc \
    xfonts-type1 \
    x11-utils && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
