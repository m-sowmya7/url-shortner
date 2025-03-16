import { connect } from 'mongoose';

export  async function connectToMongoDb(url) {
    return connect(url);
}
