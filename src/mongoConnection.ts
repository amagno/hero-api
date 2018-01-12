import * as mongoose from 'mongoose';
import * as colors from 'colors';


(<any>mongoose).Promise = Promise;
mongoose.set('debug', true);

const MONGO_URL = 'mongodb://testing:testing123@ds151207.mlab.com:51207/hero-api';

export default (): mongoose.Connection => {

    mongoose.connect(MONGO_URL, {
        useMongoClient: true
    }, error => {
        if (error) {
            console.log(colors.red('Error on MongoDB: '), error);
        }
    });
    
    const mongoConnection: mongoose.Connection = mongoose.connection;
    
    mongoConnection.once('open', () => {
        console.log(colors.yellow('Connected to MongoDB'));
    });
    mongoConnection.on('error', (error) => {
        console.log(colors.red('Error on MongoDB: '), error);
    });
    
    return mongoConnection;
};