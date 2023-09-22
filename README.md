# Mini blog using micro services

> This is a simple blog application, focused on studying development strategies using microservices.

### Developed Features

- [x] Post service;
- [x] Comments service;
- [x] Message broker (Event-Bus);
- [x] Moderation Service;
- [x] Query service;
- [x] Sync events when query service is restarted;
- [x] Web Client;
- [x] Containerize application (Docker);

### 💻 Prerequisites

Before you begin, make sure you've met the following requirements:

* [NodeJs v10.x+](https://nodejs.org/en);
<!-- * [Docker (optional)](https://www.docker.com/get-started/) -->


### 📦 Preparing environment

To run the application, follow these steps:

Download the project and install the dependencies:

```bash
# Clone this repo
git clone https://github.com/Chriszao/mini-blog-micro-services.git

# Enter the project folder
cd mini-blog-micro-services

# Install deps P.S: You can use the package manager of your choice. 
# but this project were developed with npm, and works better with it
npm install

# Inside each service have a “start” script that does start the service server
npm run start # <inside of service>

# Inside client folder to start the client server
npm run dev
```

### ☕ Using the Application

You can start all the services servers and use the web client to create posts, and comments. If you put down the query service, and create posts or comments, the event bus will store the events to when the query service come up again, it will automatically sync the events.

---
### 🛠️ Technologies
- [Typescript](https://www.typescriptlang.org/docs/);
- [NodeJs](https://nodejs.org/en);
- [Axios](https://axios-http.com/docs/intro);
- [Express](https://expressjs.com/);

<p align="center">
  Developed with 💙 by <strong>Chriszao</strong>
</p>
