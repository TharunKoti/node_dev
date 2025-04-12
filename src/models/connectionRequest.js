const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   //reference to the User Collection
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: mongoose.Schema.Types.String,
            enum: {
                values: ["ignored", "accepted", "interested", "rejected"],
                message: `{VALUE} is not valid status type.`,
            },
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
        throw new Error("Invalid request.");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
