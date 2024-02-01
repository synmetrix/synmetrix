Synmetrix CLI Documentation

**Introduction**

The Synmetrix Command Line Interface (CLI) provides a convenient way to manage the stack containers. This interface is designed to start, stop, restart, destroy containers, execute commands within them, run Compose stack, push Docker Compose images, display container status, view logs, execute Hasura commands, and run project tests.

**Usage**

The Synmetrix CLI is executed using the `./cli.sh` script in the project's root directory. The following commands are available:

1. **services up**

   - **Description:** Start the containers of the stack.
   - **Parameters:**
     - `name` (optional): Specify the name of a particular container to start.
   - **Command:**
     ```bash
     ./cli.sh services up [name]
     ```

2. **services stop**

   - **Description:** Stop the containers of the stack.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container to stop.
   - **Command:**
     ```bash
     ./cli.sh services stop [name]
     ```

3. **services restart**

   - **Description:** Restart the containers of the stack.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container to restart.
   - **Command:**
     ```bash
     ./cli.sh services restart [name]
     ```

4. **services destroy**

   - **Description:** Destroy (remove) the containers of the stack.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container to destroy.
   - **Command:**
     ```bash
     ./cli.sh services destroy [name]
     ```

5. **services ex**

   - **Description:** Execute a command within a container.
   - **Arguments:**
     - `name`: Specify the name of the container where the command will be executed.
     - `cmd`: Specify the command to be executed within the container.
   - **Command:**
     ```bash
     ./cli.sh services ex [name] [cmd]
     ```

6. **services run**

   - **Description:** Run the Docker Compose stack.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container.
   - **Command:**
     ```bash
     ./cli.sh services run [name]
     ```

7. **services push**

   - **Description:** Push Docker Compose images.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container.
   - **Command:**
     ```bash
     ./cli.sh services push [name]
     ```

8. **services ps**

   - **Description:** Display the status of containers.
   - **Command:**
     ```bash
     ./cli.sh services ps
     ```

9. **services logs**

   - **Description:** View logs of all containers or logs of a specific container.
   - **Arguments:**
     - `name` (optional): Specify the name of a particular container.
   - **Command:**
     ```bash
     ./cli.sh services logs [name]
     ```

10. **hasura cli cmd**

    - **Description:** Execute a command in Hasura.
    - **Examples:**
      - View possible actions:
        ```bash
        ./cli.sh hasura cli actions
        ```

11. **test run**

    - **Description:** Run project tests using StepCI.
    - **Command:**
      ```bash
      ./cli.sh test run
      ```

## To test the Synmetrix CLI, you can use the following command:

```bash
yarn test
```
