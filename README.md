<div align="center">

🎨 GitHub Contribution Art Generator

Transform Your GitHub Profile with Beautiful Contribution Patterns

<p align="center">
<strong>Create stunning patterns, text, and artwork on your GitHub contribution graph!</strong>
</p>

<p align="center">
<a href="https://www.google.com/search?q=%23-features">Features</a> •
<a href="https://www.google.com/search?q=%23-quick-start">Quick Start</a> •
<a href="https://www.google.com/search?q=%23-installation">Installation</a> •
<a href="https://www.google.com/search?q=%23-usage">Usage</a> •
<a href="#-patterns">Patterns</a> •
<a href="https://www.google.com/search?q=%23-support">Support</a>
</p>

🌟 100% FREE | All Features Included | Easy to Use

</div>

📑 Table of Contents

✨ Features

🖼️ Preview

🚀 Quick Start

📦 Installation

🔑 Getting Your FREE License Key

⚙️ Configuration

📖 Usage

🎨 Available Patterns

💡 Examples

❓ FAQ

🔧 Troubleshooting

🤝 Contributing

📄 License

👨‍💻 Author

🆘 Support

✨ Features

<table>
<tr>
<td width="50%">

🎯 Core Features

✅ Custom Date Ranges - Generate commits for any time period

✅ Multiple Patterns - Heart, wave, checkerboard & more

✅ Organic Mode - Realistic random contribution patterns

✅ Preview Mode - ASCII art preview before committing

✅ Dry Run - Test without making actual commits

✅ Progress Tracking - Real-time progress bar with ETA

</td>
<td width="50%">

🛡️ Security & Quality

✅ License System - Secure key-based activation

✅ Offline Support - Works without internet after activation

✅ Error Handling - Robust error recovery

✅ Git Integration - Automatic staging, committing & pushing

✅ Configurable - Customize every aspect

✅ Cross-Platform - Works on Windows, macOS & Linux

</td>
</tr>
</table>

🖼️ Preview

ASCII Pattern Preview

  📊 Contribution Preview
  ────────────────────────────────────

  Sun: █░░█░░█░░█░░█░░█░░█░░█
  Mon: ▓█░▓█░▓█░▓█░▓█░▓█░▓█░▓
  Tue: ░▓█░▓█░▓█░▓█░▓█░▓█░▓█░
  Wed: █░▓█░▓█░▓█░▓█░▓█░▓█░▓█
  Thu: ▓█░▓█░▓█░▓█░▓█░▓█░▓█░▓
  Fri: ░▓█░▓█░▓█░▓█░▓█░▓█░▓█░
  Sat: █░░█░░█░░█░░█░░█░░█░░█

  Legend: [ ] None [░] Low [▒] Med [▓] High [█] Max


Heart Pattern Example

  Sun:   ██    ██   
  Mon: ████  ████ 
  Tue: ██████████ 
  Wed: ██████████ 
  Thu:   ██████   
  Fri:     ██     
  Sat:            


🚀 Quick Start

Get up and running in 5 minutes:

# 1. Clone the repository
git clone [https://github.com/AYUSH-DAYAL/github-contribution-art.git](https://github.com/AYUSH-DAYAL/github-contribution-art.git)

# 2. Navigate to project
cd github-contribution-art

# 3. Install dependencies
npm install

# 4. Setup configuration
cp .env.example .env

# 5. Configure author details (see Configuration section)
# 6. Get your FREE license key (see License Key section)

# 7. Activate license
npm run activate

# 8. Preview your contribution graph
npm run preview

# 9. Generate contributions!
npm start


📦 Installation

Prerequisites

Requirement

Minimum Version

Check Command

Node.js

v18.0.0 or higher

node --version

npm

v9.0.0 or higher

npm --version

Git

v2.0.0 or higher

git --version

Step-by-Step Installation

Step 1: Clone the Repository

git clone [https://github.com/AYUSH-DAYAL/github-contribution-art.git](https://github.com/AYUSH-DAYAL/github-contribution-art.git)
cd github-contribution-art


Step 2: Install Dependencies

npm install


<details>
<summary>📦 Click to see installed packages</summary>

Package

Purpose

chalk

Terminal styling

cli-progress

Progress bar display

commander

CLI argument parsing

date-fns

Date manipulation

dotenv

Environment configuration

jsonfile

JSON file operations

ora

Loading spinners

simple-git

Git operations

</details>

Step 3: Create Configuration File

cp .env.example .env


Step 4: Configure Author Details

Edit src/branding/author.js:

export const AUTHOR = {
  name: 'Ayush Dayal',
  github: 'AYUSH-DAYAL',
  repo: 'github-contribution-art',
  email: 'ayushdayal08@gmail.com',
  website: '[https://github.com/AYUSH-DAYAL](https://github.com/AYUSH-DAYAL)',
  donate: '[https://buymeacoffee.com/AYUSH-DAYAL](https://buymeacoffee.com/AYUSH-DAYAL)',
};


Step 5: Add Public Key

Edit src/licensing/publicKey.js and replace the placeholder with the actual public key provided by the author.

🔑 Getting Your FREE License Key

This software requires a FREE license key for activation.

How to Get Your Key

<table>
<tr>
<td width="60">

1️⃣

</td>
<td>

Star this Repository

Click the ⭐ button at the top of this page

</td>
</tr>
<tr>
<td>

2️⃣

</td>
<td>

Follow the Author

Follow @AYUSH-DAYAL on GitHub

</td>
</tr>
<tr>
<td>

3️⃣

</td>
<td>

Request Your Key

Send an email to ayushdayal08@gmail.com with:

Your GitHub username

Your email address

</td>
</tr>
<tr>
<td>

4️⃣

</td>
<td>

Receive Your Key

You'll receive your FREE license key within 24 hours!

</td>
</tr>
</table>

Activating Your License

npm run activate


When prompted, paste your license key:

🔑 License Activation

Paste License Key: eyJwcm9kdWN0IjoiR2l0SHViI...

✅ LICENSE ACTIVATED!
   User: AYUSH-DAYAL (ayushdayal08@gmail.com)
   Features: ALL ENABLED (FREE)


Verify Your License

npm run verify


⚙️ Configuration

Environment Variables

Edit the .env file to customize your settings:

# ═══════════════════════════════════════════════════════════════
# DATE RANGE
# ═══════════════════════════════════════════════════════════════
# Format: YYYY-MM-DD
START_DATE=2024-01-01
END_DATE=2024-12-31

# ═══════════════════════════════════════════════════════════════
# COMMIT SETTINGS
# ═══════════════════════════════════════════════════════════════
# Minimum commits per active day (1-50)
MIN_COMMITS_PER_DAY=1

# Maximum commits per active day (1-50)
MAX_COMMITS_PER_DAY=15

# Probability to skip a day (0.0 - 1.0)
# 0.15 = 15% chance to skip (creates realistic gaps)
SKIP_PROBABILITY=0.15

# ═══════════════════════════════════════════════════════════════
# GIT SETTINGS
# ═══════════════════════════════════════════════════════════════
GIT_REMOTE=origin
GIT_BRANCH=main

# ═══════════════════════════════════════════════════════════════
# OPTIONAL: GitHub Token (for star/follow verification)
# ═══════════════════════════════════════════════════════════════
# Create at: [https://github.com/settings/tokens](https://github.com/settings/tokens)
GITHUB_TOKEN=


Configuration Options Explained

Option

Type

Default

Description

START_DATE

Date

2024-01-01

First day to generate commits

END_DATE

Date

2024-12-31

Last day to generate commits

MIN_COMMITS_PER_DAY

Number

1

Minimum commits on active days

MAX_COMMITS_PER_DAY

Number

15

Maximum commits on active days

SKIP_PROBABILITY

Float

0.15

Chance to skip a day (0-1)

GIT_REMOTE

String

origin

Git remote name

GIT_BRANCH

String

main

Git branch name

GITHUB_TOKEN

String

``

Optional GitHub token

📖 Usage

Available Commands

Command

Description

npm start

Generate contributions and push to GitHub

npm run activate

Activate your license key

npm run verify

Check license status

npm run preview

Preview pattern as ASCII art (no commits)

npm run dry-run

Test run without making actual commits

npm run patterns

List all available patterns

Command Line Options

node src/index.js [options]


Option

Alias

Description

Example

--start <date>

-s

Start date (YYYY-MM-DD)

--start 2024-01-01

--end <date>

-e

End date (YYYY-MM-DD)

--end 2024-12-31

--pattern <name>

-p

Use specific pattern

--pattern heart

--min <number>



Min commits per day

--min 5

--max <number>



Max commits per day

--max 20

--dry-run

-d

Run without commits

--dry-run

--preview



Show ASCII preview

--preview

--no-push



Skip git push

--no-push

--verbose

-v

Show detailed logs

--verbose

--help

-h

Show help

--help

Usage Examples

# Basic usage (uses .env settings)
npm start

# Custom date range
npm start -- --start 2024-01-01 --end 2024-06-30

# Use a specific pattern
npm start -- --pattern heart

# Preview before running
npm start -- --preview

# Test without making commits
npm start -- --dry-run

# Custom commits range
npm start -- --min 5 --max 25

# Combine options
npm start -- --pattern wave --start 2024-01-01 --end 2024-03-31 --max 20

# Generate without pushing
npm start -- --no-push


🎨 Available Patterns

Pattern Gallery

<table>
<tr>
<th>Pattern</th>
<th>Preview</th>
<th>Command</th>
</tr>
<tr>
<td><strong>❤️ Heart</strong></td>
<td>

  ██  ██
████████
████████
  ████
    ██


</td>
<td>

--pattern heart

</td>
</tr>
<tr>
<td><strong>🌊 Wave</strong></td>
<td>

█░░░░█░░░░█
░█░░█░░█░░█
░░██░░░░██░


</td>
<td>

--pattern wave

</td>
</tr>
<tr>
<td><strong>♟️ Checkerboard</strong></td>
<td>

█ █ █ █ █
 █ █ █ █ 
█ █ █ █ █


</td>
<td>

--pattern checkerboard

</td>
</tr>
<tr>
<td><strong>📐 Diagonal</strong></td>
<td>

█░░░█░░░
░█░░░█░░
░░█░░░█░
░░░█░░░█


</td>
<td>

--pattern diagonal

</td>
</tr>
<tr>
<td><strong>⬛ Solid</strong></td>
<td>

████████
████████
████████


</td>
<td>

--pattern solid

</td>
</tr>
<tr>
<td><strong>🎲 Random</strong></td>
<td>

█░▓░█▒░█
▒█░▓▒░█░
░▒█░▓█▒░


</td>
<td>

Default (no pattern flag)

</td>
</tr>
</table>

List All Patterns

npm run patterns


💡 Examples

Example 1: Fill an Entire Year

# Edit .env
START_DATE=2024-01-01
END_DATE=2024-12-31

# Run
npm start


Example 2: Create a Heart Pattern for Valentine's Day

npm start -- --pattern heart --start 2024-02-01 --end 2024-02-28


Example 3: High Activity Period

# Simulate intense coding period
npm start -- --min 10 --max 30 --start 2024-03-01 --end 2024-03-31


Example 4: Realistic Contribution Pattern

# Lower commits, more skip days = more realistic
# Edit .env:
MIN_COMMITS_PER_DAY=1
MAX_COMMITS_PER_DAY=8
SKIP_PROBABILITY=0.25

npm start


Example 5: Preview Multiple Patterns

# Check different patterns before choosing
npm start -- --pattern heart --preview
npm start -- --pattern wave --preview
npm start -- --pattern checkerboard --preview


❓ FAQ

<details>
<summary><strong>Q: Is this tool really free?</strong></summary>

A: Yes! This tool is 100% free. You just need to request a free license key by starring the repo and following the author. All features are included at no cost.

</details>

<details>
<summary><strong>Q: Why do I need a license key if it's free?</strong></summary>

A: The license system helps us:

Track usage and improve the tool

Build a community of users

Provide support to verified users

Prevent abuse of the tool

</details>

<details>
<summary><strong>Q: Will this affect my real contributions?</strong></summary>

A: The commits are made to a data file in this repository only. Your other repositories remain unaffected. However, these commits do appear on your GitHub contribution graph.

</details>

<details>
<summary><strong>Q: Can I use this for past dates?</strong></summary>

A: Yes! Git allows backdated commits. You can set any date range, including dates in the past.

</details>

<details>
<summary><strong>Q: Is this against GitHub's Terms of Service?</strong></summary>

A: This tool creates real commits to a real repository. Use responsibly and for personal/educational purposes. The author is not responsible for any misuse.

</details>

<details>
<summary><strong>Q: How long does the license last?</strong></summary>

A: Free licenses are valid for approximately 100 years (essentially forever). You won't need to renew.

</details>

<details>
<summary><strong>Q: Can I use this on multiple machines?</strong></summary>

A: Yes, you can use your license key on multiple machines.

</details>

<details>
<summary><strong>Q: The push failed. What do I do?</strong></summary>

A: Make sure you have:

Initialized git: git init

Added remote: git remote add origin <your-repo-url>

Made initial commit: git add . && git commit -m "Initial commit"

Proper permissions to push to the repository

</details>

🔧 Troubleshooting

Common Issues & Solutions

<table>
<tr>
<th width="30%">Error</th>
<th width="30%">Cause</th>
<th width="40%">Solution</th>
</tr>
<tr>
<td>

No license key found

</td>
<td>

License not activated

</td>
<td>

Run npm run activate and enter your key

</td>
</tr>
<tr>
<td>

Invalid license signature

</td>
<td>

Wrong public key or corrupted license

</td>
<td>

Verify publicKey.js has correct key

Request a new license key

</td>
</tr>
<tr>
<td>

Cannot find module

</td>
<td>

Dependencies not installed

</td>
<td>

Run npm install

</td>
</tr>
<tr>
<td>

Not a git repository

</td>
<td>

Git not initialized

</td>
<td>

Run git init

</td>
</tr>
<tr>
<td>

Remote not found

</td>
<td>

Git remote not configured

</td>
<td>

Run git remote add origin <url>

</td>
</tr>
<tr>
<td>

Permission denied (push)

</td>
<td>

No push access to repo

</td>
<td>

Check repo permissions and authentication

</td>
</tr>
<tr>
<td>

Invalid date format

</td>
<td>

Wrong date in .env

</td>
<td>

Use format: YYYY-MM-DD

</td>
</tr>
<tr>
<td>

startDate must be before endDate

</td>
<td>

Dates in wrong order

</td>
<td>

Swap the dates in .env

</td>
</tr>
</table>

Debug Mode

For detailed error information:

npm start -- --verbose


Reset License

If you need to reset your license:

rm .license
npm run activate


Getting Help

If you're still stuck:

📖 Check the FAQ section

🔍 Search existing issues

🐛 Open a new issue

📧 Email: ayushdayal08@gmail.com

🤝 Contributing

Contributions are welcome! Here's how you can help:

Ways to Contribute

🐛 Report Bugs - Open an issue describing the bug

💡 Suggest Features - Open an issue with your idea

📝 Improve Documentation - Submit a PR with doc improvements

🎨 Add Patterns - Create new pattern templates

🔧 Fix Bugs - Submit a PR with bug fixes

Development Setup

# Fork the repository
# Clone your fork
git clone [https://github.com/AYUSH-DAYAL/github-contribution-art.git](https://github.com/AYUSH-DAYAL/github-contribution-art.git)

# Create a branch
git checkout -b feature/your-feature-name

# Make your changes
# Test your changes
npm run dry-run

# Commit and push
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name

# Open a Pull Request


Code Style

Use ES Modules (import/export)

Follow existing code formatting

Add comments for complex logic

Test before submitting

📄 License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2024 Ayush Dayal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


👨‍💻 Author

<table>
<tr>
<td align="center">
<a href="https://www.google.com/search?q=https://github.com/AYUSH-DAYAL">
<img src="https://www.google.com/search?q=https://github.com/AYUSH-DAYAL.png" width="100px;" alt="Author"/><br />
<sub><b>Ayush Dayal</b></sub>
</a>
</td>
</tr>
</table>

🌐 Website: github.com/AYUSH-DAYAL

📧 Email: ayushdayal08@gmail.com

🐙 GitHub: @AYUSH-DAYAL

☕ Buy Me a Coffee: buymeacoffee.com/AYUSH-DAYAL

🆘 Support

Need Help?

Channel

Link

📧 Email

ayushdayal08@gmail.com

🐛 Bug Reports

GitHub Issues

💬 Discussions

GitHub Discussions

📖 Documentation

Wiki

Show Your Support

If this project helped you, please consider:

⭐ Starring this repository

🐦 Sharing on social media

👥 Following the author

☕ Buying a coffee for the developer

<div align="center">

⭐ Star this repo if you find it useful! ⭐

Made with ❤️ by Ayush Dayal

</div>

<div align="center">
<sub>© 2024 Ayush Dayal. All rights reserved.</sub>
</div>