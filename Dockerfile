FROM node:12.20.2-alpine3.11 as dev

ENV PATH="/usr/app/node_modules/.bin:${PATH}"
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node
CMD cd "/usr/app" && \
  yarn && \
  if [ "$WATCH_FILES" == "1" ]; then yarn dev:server; else node "dist/app.js"; fi

