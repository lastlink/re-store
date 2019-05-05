// const router = new VueRouter();
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

var app = new Vue({
  el: '#Web_1920___home',
  data: {
    message: 'Hello Vue!',
    checkedNeeds: [],
    zipcode: null,
    errors: null,
    loading: null,
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
    resources: null,
    getResources: function () {
      this.loading = true;
      this.errors = null;
      this.$http.get("https://re-store.funktechno.com/iowa-json.php").then((response) => {
        this.loading = false;  
        console.log(response)
        // this.message = response.data.message;
        if (response.status == 200) {
          this.resources = response.data
        } else {
          this.errors = "Failed to Load"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve Latitude and Longitude"
        console.log(error)
        this.loading = null;

      });
    },
    navResources: function () {
      console.log(this.navResources.name + this.zipcode)
      console.log(this.navFindCustomers.name + this.zipcode)
      if (!this.zipcode) {
        this.errors = "Missing zipcode";
        return
      }
      this.errors = null;

      // router.go({ path: 'path/findCustomers.html', query: { zipcode: this.zipcode } })
      if (location.pathname.indexOf("dist") != -1) {
        location.href = "/dist/pages/resources.html?zipcode=" + this.zipcode;
      } else
        location.href = "/pages/resources.html?zipcode=" + this.zipcode;
    },
    request: function () {
      console.log("request")
    },
    offer: function () {
      console.log("request")
    },
    testData: "not hello",
    updateImage(base64) {
      console.log("updating image")
      // console.log(app.data.testData)
      console.log(this.testData)
      this.testData = "hello";
      // app.data.testData="hello"
      // console.log(app.data.testData)

      console.log(this.testData)
      this.mapImage = {
        encodedImage: base64
      }
      console.log("finished")
      console.log(this.mapImage)

    },
    getMapBase64(request) {
      // request = { "zip_code": "22303", "lat": 38.794399, "lng": -77.078869, "city": "Alexandria", "state": "VA", "timezone": { "timezone_identifier": "America/New_York", "timezone_abbr": "EDT", "utc_offset_sec": -14400, "is_dst": "T" }, "acceptable_city_names": [{ "city": "Jefferson Manor", "state": "VA" }, { "city": "Jefferson Mnr", "state": "VA" }] }
      console.log("getting base64")
      console.log(request)
      // var data = null;

      // var xhr = new XMLHttpRequest();

      // updateImage = this.updateImage;

      console.log(this.testData)
      this.loading = true;
      this.errors = null;

      // xhr.withCredentials = true;
      this.$http.get("https://scrape_re-store.serveo.net/scrape?zoom=15&lat=" + request.lat + "&long=" + request.lng).then((response) => {
        console.log(this.testData)
        console.log(response)
        this.loading = false;

        // this.message = response.data.message;
        if (response.status == 200) {
          this.updateImage(response.data.base64Str)
        }else {
          this.errors = "Failed to load Map image try again"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve Latitude and Longitude"
        console.log(error)
        this.loading = null;
      });
    },
    getLongLat(zipcode, callback = null) {
      console.log("retreiveing long lat for" + zipcode)
      this.loading = true;
      this.errors = null;
      this.$http.get("https://www.zipcodeapi.com/rest/" + window.tokens.zipcodeapiToken + "/info.json/" + zipcode + "/degrees").then((response) => {
        console.log(this.testData)
        console.log(response)

        try {
          console.log(response)
          if (callback == "getMapBase64")
            this.getMapBase64(response.data)
        } catch (error) {
          this.loading = false;

          this.errors = "Failed to Retrieve Latitude and Longitude"

          console.log(error)
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve Latitude and Longitude"
        console.log(error)
        this.loading = null;

      });
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

    var url_string = location.href; //window.location.href
    var url = new URL(url_string);
    var zipcode = this.zipcode = url.searchParams.get("zipcode");

    if (zipcode) {
      // skip this for now
      if (url_string.indexOf("findCustomers") != -1)
        this.getLongLat(zipcode, this.getMapBase64.name)
      // this.getMapBase64()
    }

    switch (true) {
      case (url_string.indexOf("resources") != -1):
        this.getResources()
        break;

      default:
        console.log("url not handled")
        break;
    }

  },
})