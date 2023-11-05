ARG FUNCTION_DIR="/function"
FROM node:slim as build-image
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ARG FUNCTION_DIR
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
RUN mkdir -p ${FUNCTION_DIR}/
COPY . ${FUNCTION_DIR}
RUN ls ${FUNCTION_DIR}
WORKDIR ${FUNCTION_DIR}
RUN npm install

FROM public.ecr.aws/lambda/nodejs:latest
ARG FUNCTION_DIR
WORKDIR ${FUNCTION_DIR}
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}
RUN ls ${FUNCTION_DIR}
COPY package.json ${FUNCTION_DIR}
RUN npm install
COPY . ${FUNCTION_DIR}

RUN npm run build
RUN ls ${FUNCTION_DIR}/node_modules
RUN node node_modules/puppeteer/install.js
CMD ["node", "index.js"]