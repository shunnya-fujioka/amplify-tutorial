# https://github.com/microsoft/vscode-dev-containers/tree/main/containers/codespaces-linux
FROM mcr.microsoft.com/vscode/devcontainers/universal:1-linux

# https://qiita.com/kojiohta/items/378f7a9310c411fa41fb
USER root

RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive

RUN npm install -g @aws-amplify/cli

USER codespace