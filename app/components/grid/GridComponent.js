import Vue from 'vue';
import request from 'superagent';
import template from './GridComponent.html';

//limit on page
const photoLimit = 24;

/**
 * Filter photos by albums and user, then by title
 */
Vue.filter('searchFor', function (value, userSearchString, albumSearchString, selectedUsers) {

    let albums = this.albums;

    userSearchString = userSearchString.trim().toLowerCase();

    albumSearchString = albumSearchString.trim().toLowerCase();

    albums = albums.filter(item => {
        //Check ownership of selected users
        if (selectedUsers.length > 0 && selectedUsers.indexOf(item.userId) == -1) {
            return false;
        }
        //check albums by title
        if (albumSearchString.length > 0 && item.title.toLowerCase().indexOf(albumSearchString) == -1) {
            return false;
        }
        return item;
    }).map(item => item.id);

    return value.filter(item => {
        //skip if no albums or photo not in albums
        if (albums.length == 0 || albums.indexOf(item.albumId) == -1) {
            return false;
        }
        //search by photo title
        if (userSearchString.length > 0 && item.title.toLowerCase().indexOf(userSearchString) == -1) {
            return false;
        }
        return item;
    }).slice(0, photoLimit);
});

const GridComponent = Vue.extend({
    template,
    created() {
        this.search();
    },
    data() {
        return {
            userSearchString: "",
            albumSearchString: "",
            selectedUsers: [],
            users: [],
            albums: [],
            photos: [],
        }
    },
    methods: {
        toggleUser(i, e) {
            i.selected = !i.selected;
            e.target.className = i.selected ? 'btn btn-primary' : 'btn btn-default';
            //store only user IDs
            this.selectedUsers = this.users.filter(i => i.selected).map(i => i.id);
        },
        search() {
            var th = this;
            //fetch all data from API
            request
                .get('https://jsonplaceholder.typicode.com/users')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    th.users = res.body;
                });

            request
                .get('https://jsonplaceholder.typicode.com/albums')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    th.albums = res.body;
                });

            request
                .get('https://jsonplaceholder.typicode.com/photos')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    th.photos = res.body;
                });
        },
    }
});
export default GridComponent;
