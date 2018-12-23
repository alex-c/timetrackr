export default {
    methods: {
        //Calculates a duration in seconds from a starting timestamp to now
        calculateDuration: function(startTimestamp) {
            return = parseInt((Date.now() - startTimestamp) / 1000);
        }
    }
};
