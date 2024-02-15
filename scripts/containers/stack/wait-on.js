const waitOn = require("wait-on");
const chalk = require("chalk");

const endpoints = [
  "http-get://localhost:8080/healthz",
  "http-get://localhost:5000",
  "http-get://localhost:8081/healthz",
  "http-get://localhost:3000/healthz",
  "http-get://localhost:4000",
];

console.log(
  chalk.bgYellowBright(
    chalk.black(
      "Starting services initialization, wait until ready (5-7 minutes)"
    )
  )
);

setInterval(() => {
  const onlineServices = [];

  const allPromises = endpoints.map(
    (endpoint) =>
      new Promise((resolve) => {
        waitOn(
          {
            resources: [endpoint],
            timeout: 1000,
          },
          (err) => {
            if (err) {
              console.log(chalk.red("Service is not ready at", endpoint));
            } else {
              console.log(chalk.green("Service is healthy at", endpoint));
              onlineServices.push(endpoint);
            }

            resolve();
          }
        );
      })
  );

  Promise.all(allPromises).then(() => {
    if (onlineServices.length === endpoints.length) {
      console.log(
        chalk.green("Synmetrix Stack is ready, go to http://localhost")
      );
      process.exit(0);
    }

    console.log(
      chalk.bgYellowBright(
        chalk.black(
          "Waiting for services to be ready... Ready (",
          onlineServices.length,
          "/",
          endpoints.length,
          ")"
        )
      )
    );
  });
}, 15000);
