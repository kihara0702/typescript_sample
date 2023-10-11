FROM ubuntu:jammy

#base
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y apt-utils sudo locales tzdata \
    iputils-ping net-tools jq tzdata curl python3 gcc make sqlite3 \
    g++ git\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV TZ Asia/Tokyo

RUN groupadd -g 1000 ts-user \
    && useradd -u 1000 -g 1000 -m ts-user \
    && gpasswd -a ts-user sudo \
    && echo "ts-user:passwd" | chpasswd \
    && echo "root:passwd" | chpasswd

USER ts-user

SHELL [ "/bin/bash", "-c" ]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

RUN . $HOME/.nvm/nvm.sh \
    && nvm install --lts \
    && nvm use --lts \
    && nvm cache clear \
    && node -v && npm -v \
    && npm i -g yarn \
    && npm i -g typescript \
    && npm i -g ts-node \
    && tsc --version

RUN echo -e "\
    export NVM_DIR=\"\$HOME/.nvm\"\n\
    [ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"\n\
    " >> ~/.bashrc

CMD ["bash"]