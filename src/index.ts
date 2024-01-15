import dotenv, { config } from 'dotenv';
import Realm from 'realm';
dotenv.config({
    path:'.env.local'
})

interface IReamlDB {
    dbname:string;
    collection:string;
    app_id:string;
}

const dbConfig: IReamlDB = {
    dbname:process.env.DATABASE_NAME as string,
    collection:process.env.COLLECTION as string,
    app_id:process.env.APP_ID as string
}

async function main() {
  const app = new Realm.App({ id: dbConfig.app_id });
  const user = await app.logIn(Realm.Credentials.anonymous());

  const mongodb = user.mongoClient('mongodb-atlas');
  const database = mongodb.db(dbConfig.dbname);
  const collection = database.collection(dbConfig.collection);
  const query = { title: 'The Great Train Robbery' };
  const result = await collection.find(query)

  // Find and update a document
  // const result = await collection.findOneAndUpdate(query, update);
  console.log(result);

  // Close the app when done
  //await app.close();
}

main().catch((error) => console.error('Error:', error));
