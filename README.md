# Basic Sales & Inventory System

## Overview

This is a simple **Sales & Inventory System** built with modern web technologies. It allows businesses to track their inventory and record sales transactions.

## Tech Stack

- **Frontend:** React with TypeScript
- **Backend:** Express with TypeScript
- **Database:** Microsoft SQL Server (MSSQL)

## Tools Used

- **Shadcn:** A UI component library for styling and layout.
- **Multer:** A middleware for handling file uploads.
- **Daemon:** Used for running background tasks or services.

## Installation Setup

Follow these steps to set up and run the project:

1. **Ensure Node.js is installed** on your system.
2. Run `npm install` in both `./client` and `./server` directories to install dependencies.
3. **Set up the database:**

   - Import the database in the `./database` directory and run it in **SQL Server 2022** with **SSMS**.
   - ⚠ **If using a different version, database attachment errors may occur.**
   - Create a **SQL Server authentication** with the correct username and password as specified in the `.env` file.
   - Configure **server roles** to **sysadmin**.
   - Configure **user mapping** to the `inventory_management` database.
   - Enable **TCP/IP** settings:
     - Use the **MSSQLSERVER** instance.
     - Set **IP Address Dynamic** to **NONE**.
     - Set **Port** to **1433**.
   - Restart the SQL Server and rerun.
   - Logged in using SQL Server Authentication

4. **Start the servers:**
   - **Frontend:** Navigate to `./client` and run:
     ```sh
     npm run dev
     ```
   - **Backend:** Navigate to `./server` and run:
     ```sh
     npm run dev
     ```

## License

This project is open-source and free to use.
