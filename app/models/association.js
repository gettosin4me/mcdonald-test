const mongoose = require('mongoose');

const AssociationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: '',
            required: true
        },
        address: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toObject: {
            virtuals: true,
            retainKeyOrder: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

AssociationSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
};

AssociationSchema.index(
    {
        id: 1,
        created_at: -1
    },
    {
        background: true
    }
);

const Association = mongoose.model('Association', AssociationSchema);

exports.Association = Association;

module.exports = Association;
