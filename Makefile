PKG_ID := $(shell grep ".id:" startos/manifest.ts | grep -o "'[^']*'" | sed "s/'//g")
PKG_VERSION := $(shell grep ".version:" startos/manifest.ts | grep -o "'[^']*'" | sed "s/'//g")
TS_FILES := $(shell find ./ -name \*.ts)
HELLO_WORLD_SRC := $(shell find ./hello-world/src) hello-world/Cargo.toml hello-world/Cargo.lock

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: submodule-update verify

verify: $(PKG_ID).s9pk
	@embassy-sdk verify s9pk $(PKG_ID).s9pk
	@echo " Done!"
	@echo "   Filesize: $(shell du -h $(PKG_ID).s9pk) is ready"

install:
ifeq (,$(wildcard ~/.embassy/config.yaml))
	@echo; echo "You must define \"host: http://embassy-server-name.local\" in ~/.embassy/config.yaml config file first"; echo
else
	embassy-cli package install $(PKG_ID).s9pk
endif

clean:
	rm -rf docker-images
	rm -f $(PKG_ID).s9pk
	rm -f scripts/*.js

submodule-update:
	@if [ -z "$(shell git submodule status | egrep -v '^ '|awk '{print $$2}')" ]; then \
		echo "Submodules are up to date."; \
	else \
		echo "\nUpdating submodules...\n"; \
		git submodule update --init --progress; \
	fi

# BEGIN REBRANDING
rebranding:
	@read -p "Enter new package ID name (must be a single word): " NEW_PKG_ID; \
	read -p "Enter new package title: " NEW_PKG_TITLE; \
	find . \( -name "*.md" -o -name ".gitignore" -o -name "manifest.yaml" -o -name "*Service.yml" \) -type f -not -path "./hello-world/*" -exec sed -i '' -e "s/hello-world/$$NEW_PKG_ID/g; s/Hello World/$$NEW_PKG_TITLE/g" {} +; \
	echo; echo "Rebranding complete."; echo "	New package ID name is:	$$NEW_PKG_ID"; \
	echo "	New package title is:	$$NEW_PKG_TITLE"; \
	sed -i '' -e '/^# BEGIN REBRANDING/,/^# END REBRANDING/ s/^#*/#/' Makefile
	@echo; echo "Note: Rebranding code has been commented out in Makefile"; echo
# END REBRANDING

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js

arm:
	@rm -f docker-images/x86_64.tar
	ARCH=aarch64 $(MAKE)

x86:
	@rm -f docker-images/aarch64.tar
	ARCH=x86_64 $(MAKE)

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh hello-world/target/aarch64-unknown-linux-musl/release/hello-world
ifeq ($(ARCH),x86_64)
else
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --build-arg ARCH=aarch64 --platform=linux/arm64 -o type=docker,dest=docker-images/aarch64.tar .
endif

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh hello-world/target/x86_64-unknown-linux-musl/release/hello-world
ifeq ($(ARCH),aarch64)
else
	mkdir -p docker-images
	docker buildx build --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --build-arg ARCH=x86_64 --platform=linux/amd64 -o type=docker,dest=docker-images/x86_64.tar .
endif

$(PKG_ID).s9pk: assets/instructions.md assets/icon.png LICENSE scripts/embassy.js docker-images/aarch64.tar docker-images/x86_64.tar
ifeq ($(ARCH),aarch64)
	@echo "embassy-sdk: Preparing aarch64 package ..."
else ifeq ($(ARCH),x86_64)
	@echo "embassy-sdk: Preparing x86_64 package ..."
else
	@echo "embassy-sdk: Preparing Universal Package ..."
endif
	@embassy-sdk pack

hello-world/target/aarch64-unknown-linux-musl/release/hello-world: $(HELLO_WORLD_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src messense/rust-musl-cross:aarch64-musl cargo build --release

hello-world/target/x86_64-unknown-linux-musl/release/hello-world: $(HELLO_WORLD_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src messense/rust-musl-cross:x86_64-musl cargo build --release
