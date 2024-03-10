const Follow = require('../models/follow');

// Follow a user
app.post('/users/:userId/follow', async (req, res) => {
    const { userId } = req.params;
    const { followedUserId } = req.body;

    try {
        const user = await Follow.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.following.includes(followedUserId)) {
            user.following.push(followedUserId);
            await user.save();
        }

        res.json({ message: Follow ${userId} followed ${followedUserId} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Unfollow a user
app.post('/users/:userId/unfollow', async (req, res) => {
    const { userId } = req.params;
    const { unfollowedUserId } = req.body;

    try {
        const user = await Follow.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.following = user.following.filter(id => id !== unfollowedUserId);
        await user.save();

        res.json({ message: User ${userId} unfollowed ${unfollowedUserId} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get users followed by a user
app.get('/users/:userId/following', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await Follow.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ following: user.following });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get users who are following a user
app.get('/users/:userId/followers', async (req, res) => {
    const { userId } = req.params;

    try {
        const followers = await Follow.find({ following: userId });
        const followerIds = followers.map(follower => follower._id);

        res.json({ followers: followerIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});