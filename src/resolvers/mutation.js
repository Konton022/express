module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: args.author,
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch (error) {
            return false;
        }
    },
    updateNote: async (parent, args, { models }) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: args.id,
            },
            {
                $set: {
                    content: args.content,
                    author: args.author,
                },
            },
            {
                new: true,
            }
        );
    },
};
