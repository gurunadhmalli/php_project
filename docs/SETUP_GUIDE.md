# Setup Guide – Task Tracker (Step by Step)

This guide takes you from a fresh Windows computer to the Task Tracker running in your browser. It covers:
- installing every tool
- creating the database
- the exact commands to run, and the order to run them in

> **Time needed:** about 45–60 minutes the first time, and about 1 minute on later days ([Section 7](#7-running-the-project-every-day)).
> **Written for:** Windows 10/11. Notes for macOS and Linux are in [Section 11](#11-macos--linux-notes).

---

## Contents

1. [What you will install](#1-what-you-will-install)
2. [Install Git](#2-install-git)
3. [Install PHP](#3-install-php)
4. [Install Composer](#4-install-composer)
5. [Install MySQL](#5-install-mysql)
6. [Install Node.js](#6-install-nodejs)
7. [Running the project every day](#7-running-the-project-every-day)
8. [First-time project setup](#8-first-time-project-setup)
9. [Running the automated tests](#9-running-the-automated-tests)
10. [Useful commands (cheat sheet)](#10-useful-commands-cheat-sheet)
11. [macOS / Linux notes](#11-macos--linux-notes)
12. [Troubleshooting](#12-troubleshooting)

> **Order matters:** install the tools in Sections 2–6, then do the **first-time setup in Section 8**. After that, Section 7 is all you need each day.

---

## 1. What you will install

| Tool | Version | Why it's needed |
|---|---|---|
| **Git** | 2.x | Download the project from GitHub |
| **PHP** | 8.2 or newer (8.3 recommended) | Runs the Laravel backend |
| **Composer** | 2.x | Installs Laravel and other PHP packages |
| **MySQL Community Server** | 8.0 or 8.4 LTS | Stores users and tasks |
| **Node.js** | 22 LTS (20+ works) | Runs the React frontend; includes `npm` |

Optional:
- **MySQL Workbench**: a visual tool for looking at the database
- **VS Code**: a code editor
- **Postman**: for testing the API

> ⚠️ **Don't use XAMPP's database.** XAMPP ships with MariaDB, not MySQL. This project uses MySQL. If XAMPP is installed, stop its MySQL/MariaDB service so it doesn't take port 3306.

### How to open a terminal

Press <kbd>Win</kbd>, type **PowerShell**, and press <kbd>Enter</kbd>. Every command in this guide is typed there.

> After installing any tool that changes your `PATH`, **close and reopen PowerShell** before using it. Old windows don't see the new tool.

---

## 2. Install Git

1. Go to **https://git-scm.com/download/win**.
2. Download the **64-bit Git for Windows Setup** and run it.
3. Click **Next** through the installer, keeping the default options.
4. Open a **new** PowerShell window and check it worked:

```powershell
git --version
```

✅ Expected: `git version 2.x.x`

Tell Git who you are (one time only):

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## 3. Install PHP

### 3.1 Download

1. Go to **https://windows.php.net/download/**.
2. Under **PHP 8.3** (or 8.4), find **VS16 x64 Thread Safe** (or VS17) and click **Zip** to download it.
3. Create the folder **`C:\php`**.
4. Extract **everything** from the zip into `C:\php`. You should now have the file `C:\php\php.exe`.

> If PHP later complains about a missing `VCRUNTIME140.dll`, install the **Microsoft Visual C++ Redistributable (x64)**. Search "Visual C++ Redistributable latest supported download" on microsoft.com and get the x64 installer.

### 3.2 Create the configuration file `php.ini`

1. In `C:\php`, find the file **`php.ini-development`**.
2. Copy it, then rename the copy to **`php.ini`**.
3. Open `php.ini` in Notepad or VS Code.

### 3.3 Enable the required extensions

In `php.ini`, use **Ctrl+F** to find each line below and **remove the `;`** at the start of the line. A `;` means the line is switched off.

```ini
extension_dir = "ext"

extension=curl
extension=fileinfo
extension=mbstring
extension=openssl
extension=pdo_mysql
extension=zip
```

Optionally, also set your time zone (find `;date.timezone =`):

```ini
date.timezone = Asia/Kolkata
```

Save the file.

### 3.4 Add PHP to the PATH

1. Press <kbd>Win</kbd>, type **environment variables**, and open **"Edit the system environment variables"**.
2. Click **Environment Variables…**.
3. Under **User variables**, select **Path** → **Edit** → **New** → type `C:\php` → **OK** → **OK** → **OK**.
4. **Close and reopen PowerShell.**

### 3.5 Check PHP

```powershell
php -v
php -m
```

✅ Expected:
- `php -v` shows `PHP 8.3.x (cli)` (or 8.2+).
- The list from `php -m` includes **curl, fileinfo, mbstring, openssl, pdo_mysql, zip**.

> If `pdo_mysql` is missing from the list, go back to Step 3.3. Usually `extension_dir` is still commented out, or you edited `php.ini-development` instead of `php.ini`.

---

## 4. Install Composer

Composer is PHP's package manager. It downloads Laravel for you.

1. Go to **https://getcomposer.org/download/**.
2. Download and run **Composer-Setup.exe**.
3. When asked for the PHP executable, choose **`C:\php\php.exe`**.
4. Leave the proxy settings empty and finish the installer.
5. **Close and reopen PowerShell**, then check:

```powershell
composer -V
```

✅ Expected: `Composer version 2.x.x`

---

## 5. Install MySQL

### 5.1 Download and install

1. Go to **https://dev.mysql.com/downloads/mysql/**.
2. Select **Microsoft Windows**. Download the **MSI Installer** for **MySQL Community Server 8.4 LTS**.
   - On the download page, click **"No thanks, just start my download."** You don't need an account.
3. Run the installer and choose the **Typical** setup.
4. At the end, keep **"Run MySQL Configurator"** ticked. In the configurator:

   | Screen | What to choose |
   |---|---|
   | Type and Networking | **Development Computer**, port **3306** |
   | Authentication | Use the default (strong password encryption) |
   | Accounts and Roles | Set a **root password**. Write it down; you will need it. |
   | Windows Service | ✅ Configure MySQL as a Windows Service, ✅ Start at system startup |

5. Click **Execute** and then **Finish**.

> **Alternative:** the older **MySQL Installer for Windows** (https://dev.mysql.com/downloads/installer/) installs MySQL 8.0 plus **MySQL Workbench** in one go. Either version works for this project.

### 5.2 Add MySQL to the PATH (so the `mysql` command works)

Add this folder to your **Path**, the same way as Step 3.4. Adjust the version number if yours is different:

```
C:\Program Files\MySQL\MySQL Server 8.4\bin
```

Close and reopen PowerShell, then check:

```powershell
mysql --version
```

✅ Expected: `mysql  Ver 8.4.x for Win64`

### 5.3 Make sure MySQL is running

```powershell
Get-Service *mysql*
```

✅ The **Status** should be **Running**. If it says **Stopped**, run this in a PowerShell opened **as Administrator**:

```powershell
Start-Service MySQL84      # use the exact Name shown by Get-Service, e.g. MySQL80
```

---

## 6. Install Node.js

1. Go to **https://nodejs.org/**.
2. Download the **LTS** version (Windows Installer, `.msi`) and run it with the default options.
3. **Close and reopen PowerShell**, then check:

```powershell
node -v
npm -v
```

✅ Expected: `v22.x.x` (or 20+) and `10.x.x`

> If PowerShell says *"running scripts is disabled on this system"* when you run `npm`, run this once:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

---

## 7. Running the project every day

> **Doing this for the first time?** Do [Section 8](#8-first-time-project-setup) first, then come back here.

You need **two PowerShell windows** open at the same time.

**Window 1 – Backend (Laravel API):**

```powershell
cd C:\MyProjects\php_project\backend
php artisan serve
```

✅ Expected: `INFO  Server running on [http://127.0.0.1:8000].` Leave this window open.

**Window 2 – Frontend (React):**

```powershell
cd C:\MyProjects\php_project\frontend
npm run dev
```

✅ Expected: `➜  Local:   http://localhost:5173/`. Leave this window open too.

**Open the app:** go to **http://localhost:5173** in your browser.

> ⚠️ Use **http://localhost:5173**, not port 8000. Port 8000 is only the API. The React app on 5173 forwards API calls to it automatically.

**To stop:** press <kbd>Ctrl</kbd>+<kbd>C</kbd> in each window.

### Test logins

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `Admin@123` |
| User | `alice@example.com` | `User@1234` |
| User | `bob@example.com` | `User@1234` |

In development, the login page also has **Admin / Alice / Bob** buttons that fill these in for you.

---

## 8. First-time project setup

Do these steps **once**, in order.

### Step 1 – Download the project

```powershell
mkdir C:\MyProjects -Force
cd C:\MyProjects
git clone https://github.com/gurunadhmalli/php_project.git
cd php_project
```

> If you already have the project folder, skip the clone and just `cd` into it.

### Step 2 – Create the databases and the database user

Log in to MySQL as `root` and enter the root password from Step 5.1:

```powershell
mysql -u root -p
```

You'll see the `mysql>` prompt. Copy and paste the commands below. **Change `choose_a_password`** to a password of your own, and remember it:

```sql
CREATE DATABASE task_tracker      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE task_tracker_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'task_app'@'localhost' IDENTIFIED BY 'choose_a_password';
GRANT ALL PRIVILEGES ON task_tracker.*      TO 'task_app'@'localhost';
GRANT ALL PRIVILEGES ON task_tracker_test.* TO 'task_app'@'localhost';
FLUSH PRIVILEGES;

SHOW DATABASES;
EXIT;
```

✅ `SHOW DATABASES;` should list `task_tracker` and `task_tracker_test`.

| Database | Used for |
|---|---|
| `task_tracker` | The real app data |
| `task_tracker_test` | Automated tests only. It's wiped every time the tests run, so never put real data in it. |

> 💡 You don't create any tables by hand. Laravel **migrations** create them in Step 5.

### Step 3 – Install the backend packages

```powershell
cd C:\MyProjects\php_project\backend
composer install
```

✅ Ends with `Generating optimized autoload files` and no red errors. It creates the `vendor/` folder.

### Step 4 – Configure the backend

Create your own settings file from the template, then generate the app's secret key:

```powershell
Copy-Item .env.example .env
php artisan key:generate
```

✅ Expected: `INFO  Application key set successfully.`

Now open **`backend\.env`** in an editor and set the database password you chose in Step 2:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_tracker
DB_USERNAME=task_app
DB_PASSWORD=choose_a_password     # ← your password from Step 2
```

Save the file.

> 🔒 `.env` holds your passwords. It's listed in `.gitignore`, so it's **never pushed to GitHub**. Don't remove it from `.gitignore`.

### Step 5 – Create the tables and load the sample data

```powershell
php artisan migrate --seed
```

✅ Expected: a list of migrations marked **DONE**, then the seeders marked **DONE**:

```
0001_01_01_000000_create_users_table ............ DONE
0001_01_01_000001_create_cache_table ............ DONE
2026_11_13_000001_add_role_to_users_table ....... DONE
2026_11_13_000002_create_tasks_table ............ DONE
Database\Seeders\UserSeeder ..................... DONE
Database\Seeders\TaskSeeder ..................... DONE
```

That builds every table and adds the 3 test accounts and 19 sample tasks.

### Step 6 – Install the frontend packages

```powershell
cd C:\MyProjects\php_project\frontend
npm install
```

✅ Ends with `added NN packages` and creates the `node_modules/` folder.

### Step 7 – Start the app

Follow [Section 7](#7-running-the-project-every-day): `php artisan serve` in one window, `npm run dev` in another, then open **http://localhost:5173**. 🎉

### Quick check that everything works

| Check | How | Expected |
|---|---|---|
| API is up | Open http://127.0.0.1:8000/api/health | `{"status":"ok"}` |
| Login works | Log in as `alice@example.com` | Dashboard with Alice's 8 tasks |
| Data is saved | Add a task, refresh the page | The task is still there |
| Security works | Log out, then open http://localhost:5173/ | Sent back to the login page |

---

## 9. Running the automated tests

The project has **43 PHPUnit tests**. They run against `task_tracker_test`, so your real data isn't touched.

```powershell
cd C:\MyProjects\php_project\backend
php artisan test
```

✅ Expected (at the end):

```
Tests:    43 passed
```

Run one test file, or tests whose name matches a word:

```powershell
php artisan test --filter=TaskAuthorizationTest
php artisan test --filter=login
```

> If the tests fail with `Access denied` or `Unknown database 'task_tracker_test'`, recheck Step 2. The `task_app` user needs access to **both** databases.

**API tests in Postman:** import `docs/postman/TaskTracker.postman_collection.json`, run **Auth → Login as Alice**, then try the requests in the other folders. See the collection's description for details.

---

## 10. Useful commands (cheat sheet)

### Backend – run inside `backend\`

| Command | What it does |
|---|---|
| `php artisan serve` | Start the API at http://127.0.0.1:8000 |
| `php artisan migrate --seed` | Create any missing tables and load the sample data |
| `php artisan migrate:fresh --seed` | ⚠️ **Delete all tables** and rebuild them with fresh sample data (resets the app) |
| `php artisan migrate:status` | Show which migrations have run |
| `php artisan db:seed` | Load the sample data again |
| `php artisan test` | Run all automated tests |
| `php artisan route:list --path=api` | List every API endpoint |
| `php artisan config:clear` | Clear cached settings; run this after editing `.env` if changes don't apply |
| `php artisan key:generate` | Create the app's secret key (first-time setup only) |
| `composer install` | Install PHP packages from `composer.json` |

### Frontend – run inside `frontend\`

| Command | What it does |
|---|---|
| `npm install` | Install JavaScript packages |
| `npm run dev` | Start the React app at http://localhost:5173 |
| `npm run build` | Create the production build in `frontend\dist\` |
| `npm run preview` | Preview the production build locally |

### Database (MySQL)

| Command | What it does |
|---|---|
| `mysql -u task_app -p task_tracker` | Open the app database in the MySQL shell |
| `SELECT id, name, email, role FROM users;` | See the users (run inside the MySQL shell) |
| `SELECT email, password FROM users;` | Check that passwords are stored as hashes (start with `$2y$`) |
| `mysqldump -u task_app -p --single-transaction task_tracker > backup.sql` | **Back up** the database to a file |
| `mysql -u task_app -p task_tracker < backup.sql` | **Restore** the database from a backup |

> In **PowerShell**, the `<` restore redirect doesn't work. Use this instead:
> ```powershell
> Get-Content backup.sql | mysql -u task_app -p task_tracker
> ```
> or run the restore from **Command Prompt (cmd)**.

### Git

| Command | What it does |
|---|---|
| `git status` | See what has changed |
| `git add -A` | Stage all changes |
| `git commit -m "Describe your change"` | Save a snapshot |
| `git push` | Upload your commits to GitHub |
| `git pull` | Download the latest changes from GitHub |

---

## 11. macOS / Linux notes

The project steps (Section 8) are the same. Only installing the tools differs, and `cp` replaces `Copy-Item`.

**macOS (with Homebrew – https://brew.sh):**

```bash
brew install php composer mysql node git
brew services start mysql
mysql_secure_installation          # set the root password
```

**Ubuntu / Debian:**

```bash
sudo apt update
sudo apt install -y php-cli php-mysql php-mbstring php-xml php-curl php-zip unzip git mysql-server
# Composer: follow https://getcomposer.org/download/
# Node.js 22 LTS: follow https://nodejs.org/en/download (e.g. via nvm)
sudo systemctl start mysql
sudo mysql                          # on Ubuntu, root logs in with sudo instead of a password
```

> On Ubuntu the packaged PHP version depends on your release. Check `php -v` shows **8.2 or newer**.

Then in Section 8, Step 4, use:

```bash
cp .env.example .env
```

---

## 12. Troubleshooting

| Problem / error message | Cause | Fix |
|---|---|---|
| `'php' is not recognized…` (same for `composer`, `mysql`, `node`) | The tool isn't in your PATH, or PowerShell was opened before installing | Recheck the PATH step for that tool, then **open a new PowerShell window** |
| `could not find driver` | The `pdo_mysql` extension is off | In `C:\php\php.ini`, remove `;` from `extension=pdo_mysql` and `extension_dir = "ext"`, then check `php -m` |
| Composer: `The zip extension and unzip/7z commands are both missing` | The `zip` extension is off | Enable `extension=zip` in `php.ini` |
| `SQLSTATE[HY000] [1045] Access denied for user 'task_app'` | Wrong username or password in `.env`, or the user wasn't created | Recheck `DB_USERNAME` and `DB_PASSWORD` in `backend\.env`; redo Section 8, Step 2; run `php artisan config:clear` |
| `SQLSTATE[HY000] [2002] No connection could be made…` | MySQL isn't running | `Get-Service *mysql*`, then `Start-Service <name>` as Administrator (Section 5.3) |
| `SQLSTATE[HY000] [1049] Unknown database 'task_tracker'` | The database wasn't created | Redo Section 8, Step 2 |
| `No application encryption key has been specified` | Key not generated | `php artisan key:generate` |
| `Failed to listen on 127.0.0.1:8000` | Port 8000 is in use | Use another port: `php artisan serve --port=8001`, **and** start the frontend with that port (see the note below this table) |
| Browser shows **"Cannot reach the server"** | The backend isn't running | Start `php artisan serve` in another window |
| Vite terminal shows `http proxy error … ECONNREFUSED` | Same: the backend isn't running | Start `php artisan serve` |
| Login fails with **419 / "CSRF token mismatch"** or you're logged out straight away | You opened the app on a different address than configured | Use **http://localhost:5173**. If you use another host or port, add it to `SANCTUM_STATEFUL_DOMAINS` in `backend\.env`, then run `php artisan config:clear` |
| `Too many attempts. Please wait a minute` | Login rate limit (5 tries per minute) | Wait 60 seconds. This is a security feature. |
| `npm : … running scripts is disabled on this system` | PowerShell script policy | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `VCRUNTIME140.dll was not found` when running PHP | Missing Visual C++ runtime | Install the Microsoft Visual C++ Redistributable (x64) |
| Port 3306 already in use while installing MySQL | XAMPP's MariaDB or another MySQL is running | Stop XAMPP's MySQL/MariaDB from the XAMPP Control Panel, or uninstall it |
| Changes to `.env` don't take effect | Cached configuration | `php artisan config:clear` |
| You want to start over with clean data | — | `php artisan migrate:fresh --seed` ⚠️ deletes everything and reloads the sample data |
| Need more detail about a server error | — | Check `backend\storage\logs\laravel.log` |

> **Running the API on another port.** If you used `php artisan serve --port=8001`, start the frontend so it points at that port:
> ```powershell
> $env:VITE_API_TARGET = "http://127.0.0.1:8001"; npm run dev
> ```

---

**Next:** see the [README](../README.md) for the features, roles and security design, and [TEST_CASES.md](TEST_CASES.md) to record your test results.
