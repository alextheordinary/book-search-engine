const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }, context) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context, info) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id  },
                    {
                        $addToSet: {
                            savedBooks: {
                                authors: args.input.authors,
                                description: args.input.description,
                                title: args.input.title,
                                bookId: args.input.bookId,
                                image: args.input.image,
                                link: args.input.link
                            }
                        }
                    },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;