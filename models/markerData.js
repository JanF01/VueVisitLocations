module.exports.Data = class Data {

    constructor(userId, title, description, lat, lng, country, date) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.lat = lat;
        this.lng = lng;
        this.country = country;
        this.date = date;
    }
}