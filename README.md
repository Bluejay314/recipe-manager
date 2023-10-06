# Cooks Companion

The wealth of resources available for recipes and culinary techniques has never been more abundant, whether it's a well-stocked bookshelf of cookbooks or bookmarked cooking webpages. However, many individuals aspire to do more than merely follow instructions. They want to refine their recipes with personal touches, innovation, and refinement. Consequently, the demand has evolved beyond the mere need for recipe storage. 

Cooks Companion is a recipe management platform where you can organize your recipes. The focus however, is on the ability to personalise and develop recipes in a safe and encouraging manner. The application incorporates OpenAI's ChatGPT to help users develop their recipes.

## Installation

Once cloned into a directory, install the server dependencies.

```
cd server
npm install
```
Once the packages are installed, cd backto the root, enter the client, and install the dependencies.

```
cd ..
cd client
npm install
```

## Usage

To configure the server, you'll need to edit ```dbconfig.js``` and edit the ```process.env.DB_CLOUD_URI``` field with
a connection URI to your own MongoDB server

```
cd server
npm run start
cd ..
cd client
npm run start
```
The client runs on port 5173 and the server runs on port 3010, so once up and running navigate to http://localhost:5173 to see the application

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
