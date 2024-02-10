import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please, provide your email address'],
        unique: [true, 'This email address already exist'],
        lowcase: true,
        validate: [validator.isEmail, 'Please, provide a valid email address']
    },
    picture: {
        type: String,
        default: 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?w=415&ssl=1'
    },
    status: {
        type: String,
        default: 'Hey there ! I\'m using Whatsapp'
    },
    password: {
        type: String,
        required: [true, 'Please, provide your password'],
        minLength: [6, 'Please, make sure your password is at least 6 characters long'],
        maxLength: [128, 'Please, make sure your password is at least 128 characters long']
    }
}, {
    collection: 'users',
    timestamps: true,
});

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default UserModel;