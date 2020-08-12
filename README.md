# codehub-admin-ui

CodeHub Admin UI is the front end user interface to manage the meta-data used by the CodeHub Ingestion system.

## Usage
Once the application is running on a configured the user interface should be accessible through the usage of a Web Browser application. 

---
## Autorization Token
The application requires an Authorization Token in order to execute any action. Contact the administrator to get a valid token.

The token must be placed in the text box in the header of the application identified by the paragraph *"Authorization token..."*

## File Manifest
* public: Contain the base code to be use during the publishing
* src : Contains the source code
* test : Contains the unit testing code.
* Dockerfile: Docker image definition file


## Development setup
> CodeHub Admin UI was developed using [Vue JS](https://vuejs.org/) that is a [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) framework and [Visual Studio Code](https://code.visualstudio.com/) as main interface development environment. 

1. Install [Node JS](https://nodejs.org/en/)
2. Clone the repository from https://github.com/usdot-jpo-codehub/codehub-admin-ui
3. Open the terminal on the directory there the project was clone and type:
```bash
>npm install
>npm install -g @vue/cli
```
4. Execute the application by the following command
```bash
>npm run serve
```
This last step will provide a link that by opening in a web browser will display the CodeHub Admin User Interface.

## Docker Support
A [Docker](https://www.docker.com/) image can be build with the next command line.
```bash
  docker build -t codehub-admin-ui:latest .
```

The following command with the correct values for the environment variable will start a Docker container.
```bash
docker run --rm -d -p 8097:80 \
-e PROXY_PASS='proxy_pass "http://[HOST:PORT]/api";' \
-t -i codehub-admin-ui:latest
```

## Release History
* 3.1.0
  * Support for Categories and Popular Categories.
* 2.0.0
  * Adjustments in the data layer due a consolidation of Indexes in ElasticSearch that modified the structure of the provided data in the CodeHub-Admin-API.
  * Addition of flags:
    * visible: Makes a repository visible in the main user interface.
    * ingested: Inform whether the repository was ever ingested.
* 1.0.0
  * Initial version


## Contact information
Joe Doe : X@Y

Distributed under APACHE 2.0 license. See *LICENSE* for more information

## Contributing
1. Fork it (https://github.com/usdot-jpo-codehub/codehub-admin-ui/fork)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## Known Bugs
*

## Credits and Acknowledgment
Thank you to the Department of Transportation for funding to develop this project.

## CODE.GOV Registration Info
* __Agency:__ DOT
* __Short Description:__ CodeHub Admin UI to interface ITS CodeHub Admin API.
* __Status:__ Beta
* __Tags:__ CodeHub, DOT, Javascript, Vue JS
* __Labor Hours:__
* __Contact Name:__
* __Contact Phone:__
