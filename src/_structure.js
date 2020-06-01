module.exports = (dimensions) => {
    let result = [];
    for (let i = 0,len = dimensions.len; i < len; i++) {
        result.push({
            id: dimensions.ids[i],
            user: dimensions.users[i],
            title: dimensions.titles[i],
            timestamp: dimensions.timestamps[i],
            likecount: dimensions.likecounts[i],
            tags: dimensions.tags[i],
        })
    }
    return result;
}