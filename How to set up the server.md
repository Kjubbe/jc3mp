[Credits](https://github.com/Paradigm-MP/SI-Script-Pack)

# How to set up the server

These steps are essential to getting the server up and running.

1. Copy all packages from `packages` to your own packages directory.

2. Install node and npm as root - [source](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)

   Steps:

   - `cd ~`
   - `curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh`
   - `./nodesource_setup.sh`
   - `sudo apt install -y nodejs`

3. Run `npm i` in the following packages. Use `install.sh` with chmod +777 in serverfiles directory.

- backup
- character
- friends
- inventory
- itemuse
- loot
- tutorial
- vehicles
- watchlist

4. Run the server within `resources`. Use `tmux` for a separate session. CTRL + B then D to detach. `tmux attach` to reattach. CTRL + C to stop server. [source](<https://opensource.com/article/20/7/tmux-cheat-sheet#:~:text=Start%20tmux&text=Press%20Ctrl%2BB%20followed%20by%201%20to%20go%20to%20the,or%20P%20(for%20Previous).>)

5. Install MySQL

   Install MySQL as root [source](https://www.cloudbooklet.com/how-to-install-mysql-on-debian-11/)

   - `sudo apt update`
   - `sudo apt upgrade`
   - `sudo apt install wget`
   - `wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb` will download the package
   - `sudo apt install ./mysql-apt-config_0.8.22-1_all.deb` will install the repository
   - `sudo apt update`
   - `sudo apt install mysql-server`

     - Do not choose the default authentication method. Choose legacy encryption.

   - `sudo service mysql status` will check the status of the server

   - `INSERT INTO mysql.user (User,Host,authentication_string,ssl_cipher,x509_issuer,x509_subject) VALUES('{DB_PASSWORD}','localhost','will_be_replaced_the_next_line','','','');`
   - Since `PASSWORD()` does not work: use `SET PASSWORD FOR '{DB_USER}'@'localhost' = '{DB_PASSWORD}';` after creating user. [source](https://dev.mysql.com/doc/refman/8.0/en/set-password.html)

   - `mysql -u root -p`, `mysql -u {DB_USER} -p` and enter your password.
   - `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';` [source](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

6. Take your database name, username, and password from step 8 and insert it into `packages/character/config.js`. This will allow various packages on the server to connect to the database so they can store and retrieve information.

7. Add yourself as an Admin by adding an entry into `packages/character/events/tags.js`. You can see a few example nametags there as well. Feel free to add whatever kinds of nametags you want there. Only players with the tags `Admin` or `Mod` receive special privileges.

## Troubleshooting

- `ER_NOT_SUPPORTED_AUTH_MODE` - MySQL server

  - This error occurs when you are using a newer version of MySQL server than the one that is supported by the MySQL client. To fix this, you can either downgrade your MySQL server or upgrade your MySQL client.
  - Make sure to use MySQL Version 8 with legacy encryption.
  - `ALTER USER '{DB_USER}'@'localhost' IDENTIFIED WITH mysql_native_password BY '{DB_PASSWORD}'` [source](https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server)

- MYSQL is weird

  - `FLUSH PRIVILEGES;`

- Unexpected token

  - Node version is too low. Update to `16.x`

- Other
  - `rm -rf node_modules`
  - `su -`
  - `apt-get remove --purge "mysql-.\*"`
