
# BitcoinTX on StartOS

BitcoinTX is a self-hosted, single-user Bitcoin portfolio tracker with double-entry accounting and FIFO cost-basis. This package wraps BitcoinTX for easy installation and management on [StartOS](https://docs.start9.com).

---

## Building from Source

1. **Set up** your environment for [StartOS packaging](https://docs.start9.com/packaging-guide/) — install Docker, Make, Node.js, SquashFS, and the Start CLI.
2. **Clone** this repository (the StartOS wrapper), then run:

   ```bash
   npm install
   make
   ```
