// const router = new VueRouter();

var app = new Vue({
  el: '#Web_1920___home',
  data: {
    message: 'Hello Vue!',
    checkedNeeds: [],
    zipcode: null,
    errors: null,
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    mapImage: null,
    navFindCustomers: function () {
      console.log(this.navFindCustomers.name + this.zipcode)
      if (!this.zipcode) {
        this.errors = "Missing zipcode";
        return
      }
      this.errors = null;

      // router.go({ path: 'path/findCustomers.html', query: { zipcode: this.zipcode } })
      if (location.pathname.indexOf("dist") != -1) {
        location.href = "/dist/pages/findCustomers.html?zipcode=" + this.zipcode;
      } else
        location.href = "/pages/findCustomers.html?zipcode=" + this.zipcode;

    },
    navResources: function () {
      console.log(this.navResources.name + this.zipcode)
    },
    request: function () {
      console.log("request")
    },
    offer: function () {
      console.log("request")
    },
    getMapBase64(request) {
      console.log("getting base64")
      console.log(request)
    },
    getLongLat(zipcode, callback = null) {
      console.log("retreiveing long lat for" + zipcode)

      var data = null;

      var xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
          if (this.responseText) {

            try {
              var response = JSON.parse(this.responseText)
              console.log(response)
              callback(response)
            } catch (error) {
              console.log(error)
            }

          } else {
            console.log("empty response")
          }

        }
      });

      xhr.open("GET", "https://www.zipcodeapi.com/rest/" + window.tokens.zipcodeapiToken + "/info.json/" + zipcode + "/degrees");

      xhr.send(data);
      //promise
    },
    toggleMenu: function () {
      var x = document.getElementById("myNavbar");
      if (x.className === "collapse navbar-collapse") {
        x.className = "navbar";
      } else {
        x.className = "collapse navbar-collapse";
      }
    }
  },
  beforeMount() {
    // if zipcode then trigger map longlat
    console.log(this.zipcode);

    var url_string = location.href; //window.location.href
    var url = new URL(url_string);
    var zipcode = this.zipcode = url.searchParams.get("zipcode");

    if (zipcode) {
      this.getLongLat(zipcode, this.getMapBase64)
    }

    // console.log(`this.$el doesn't exist yet, but it will soon!`)
  },
})