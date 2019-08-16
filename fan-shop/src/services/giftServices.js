export const giftService = {
    data() {
        return {
            gifts : []
        };
    },
    created() {
        this.$http.get('feed/gifts')
            .then(({ data }) => {
                console.log(data);
                this.gifts = data.gifts;
            })
    }
}